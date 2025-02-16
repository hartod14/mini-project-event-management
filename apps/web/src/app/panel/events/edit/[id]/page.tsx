"use client"

import React, { useEffect, useState } from "react";
import { InputFieldTextarea } from "@/components/common/inputs/InputFieldTextarea";
import { InputSelect } from "@/components/common/inputs/InputSelect";
import Image from "next/image";
import DefaultImage from "@/../public/default_image.jpg"
import { ArrowUpTrayIcon, SignalIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { SwitchField } from "@/components/common/inputs/SwitchField";
import { FieldArray, Formik, Form, Field, ErrorMessage } from "formik";
import { storeEventValidator } from "@/validators/event.validator";
import { storeEventInit } from "@/helpers/formiks/event.formik";
import Swal from "sweetalert2";
import { createEvent, panelGetEventDetail, updateEvent } from "@/helpers/handlers/apis/event.api";
import { InputField } from "@/components/common/inputs/InputField";
import EventEditViewModel from "@/components/panel/pages/event/edit/EventEditViewModel";
import Link from "next/link";

type Props = {
  params: Promise<{ id: number }>;
};

export default function PanelEditEvent({ params }: Props) {
  const { cities, categories, upload, refImage, loading, isLoading, image, router } = EventEditViewModel();
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    host_name: "",
    date: "",
    start_time: "",
    end_time: "",
    address: "",
    event_category_id: "",
    city_id: "",
    description: "",
    term_condition: "",
    status: "ACTIVE",
    image: "",
    ticket_types: []
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const { id } = await params;
        const event = (await panelGetEventDetail(id)).data;

        // console.log(event);


        if (event) {
          setInitialValues({
            name: event.name,
            host_name: event.host_name,
            date: new Date(event.date).toISOString().split('T')[0],
            start_time: new Date(event.start_time).toTimeString().slice(0, 5),
            end_time: new Date(event.end_time).toTimeString().slice(0, 5),
            city_id: event.city_id,
            event_category_id: event.event_category_id,
            address: event.address,
            description: event.description,
            term_condition: event.term_condition,
            status: event.status,
            ticket_types: event.ticket_types || [],
            image: event.image
          });
        }


        // setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    }

    fetchEvent();
  }, [params]);

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={storeEventValidator}
        // onSubmit={(values) => alert(JSON.stringify(values, null, 3))}
        onSubmit={async (values) => {
          Swal.fire({
            title: "Submit this new event?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#ABABAB",
            confirmButtonText: "Yes, save it!",
            cancelButtonText: "Back"
          }).then(async (result) => {
            if (result.isConfirmed) {
              const { id } = await params;
              try {
                loading?.setLoading(true);
                const res = await updateEvent(id, values);

                if (res?.error) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong, please try again later!",
                  });
                } else {
                  Swal.fire({
                    title: "Saved!",
                    text: "Event has been updated.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                  }).then(() => {
                    router.push("/panel/events");
                  });
                }
              } catch (error) {
                alert('something error')
              } finally {
                loading?.setLoading(false);
              }
            }
          });
        }}
      >
        {(formik) => (
          <Form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <InputField id="name" type="text" name="name" label="Name" placeholder="" required />
              <InputField id="host_name" type="text" name="host_name" label="Host Name" placeholder="" required />
              <InputField id="date" type="date" name="date" label="Date" placeholder="" required />
              <div className="md:flex gap-2">
                <InputField id="start_time" type="time" name="start_time" label="Start Time" placeholder="" required />
                <InputField id="end_time" type="time" name="end_time" label="End Time" placeholder="" required />
              </div>
              <InputSelect id="city_id" name="city_id" label="Select City" options={cities} required />
              <InputSelect id="event_category_id" name="event_category_id" label="Select Category" options={categories} required />
              <InputFieldTextarea id="address" name="address" label="Address" required />
              <InputFieldTextarea id="description" name="description" label="Description" />
              <InputFieldTextarea id="term_condition" name="term_condition" label="Term & Condition" />
              <SwitchField id="status" label="Status" name="status" formik={formik} />
            </div>


            <div>
              <div className=" my-10">
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Image</label>
                  <button
                    type="button"
                    onClick={() => refImage.current?.click()}
                    className={`${isLoading ? 'bg-blue-200' : 'bg-blue-700'}  px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    disabled={isLoading}
                  >
                    <div className="flex gap-2 items-center"><ArrowUpTrayIcon width={20} height={20} />{isLoading ? "Uploading..." : "Upload image"}</div>
                  </button>
                </div>
                <Image
                  width={400}
                  height={400}
                  onClick={() => refImage.current?.click()}
                  className="rounded h-[250] w-[250] aspect-square object-cover"
                  src={isLoading ? "/spinner.gif" : image || formik.initialValues?.image || DefaultImage}
                  alt="image"
                />
                <input
                  type="file"
                  hidden
                  ref={refImage}
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => upload(e, formik.setFieldValue)}
                />
              </div>
            </div>

            <hr className="my-10 text-gray-50" />

            <FieldArray
              name="ticket_types"
              render={(arrayHelpers) => (
                <div>
                  <div className="flex gap-2 items-center">
                    <label htmlFor={'ticket_types'} className="block text-sm font-medium text-gray-900 dark:text-white">
                      Ticket Level
                    </label>
                  </div>
                  {formik.values.ticket_types.map((ticket: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center mt-3">
                      <div className="md:flex gap-4  w-full">
                        <InputField type="text" id={`ticket_types[${index}].name`} name={`ticket_types[${index}].name`} label="" placeholder="name" required />
                        <InputField type="number" id={`ticket_types[${index}].price`} name={`ticket_types[${index}].price`} label="" placeholder="quota" required />
                        <InputField type="number" id={`ticket_types[${index}].quota`} name={`ticket_types[${index}].quota`} label="" placeholder="price" required />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            />

            {/* <p className="mb-4 text-red-400">{errMessage}</p> */}

            {/* <button type="submit">
              submit
            </button> */}
            <hr className="my-10 text-gray-50" />
            <div className="flex justify-end">
              <div className="flex gap-2">
                <Link
                  href={'/panel/events'}
                  className={"bg-gray-50 border border-gray-300 text-gray-400font-semibold px-5 py-3 rounded mb-6"}
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className={`${!(formik.isValid && formik.dirty) || formik.isSubmitting
                    ? "bg-gray-300 text-gray-400"
                    : "bg-blue-900 text-white"
                    }   font-semibold px-5 py-3 rounded mb-6`}
                  disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Processing..." : "Submit"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

    </div >
  );
}
