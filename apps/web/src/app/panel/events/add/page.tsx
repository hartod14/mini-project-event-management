"use client";

// import EventsAddViewModel from "@/components/Panel/pages/event/add/EventsAddViewModel";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { InputFieldTextarea } from "@/components/common/inputs/InputFieldTextarea";
import { InputSelect } from "@/components/common/inputs/InputSelect";
import RichTextEditor from "@/components/common/inputs/RichTextEditor";
import Image from "next/image";
import { uploadImage } from "@/helpers/handlers/upload";
import DefaultImage from "@/../public/default_image.jpg"
import Spinner from "@/../public/spinner.gif"
import { ArrowUpTrayIcon, SignalIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { SwitchField } from "@/components/common/inputs/SwitchField";
import { FieldArray, Formik, Form, Field, ErrorMessage } from "formik";
import { storeEventValidator } from "@/validators/event.validator";
import { storeEventInit } from "@/helpers/formiks/event.formik";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { LoadingContext } from "@/context/LoadingContext";
import { createEvent } from "@/helpers/handlers/apis/event.api";
import { InputField } from "@/components/common/inputs/InputField";
import EventAddViewModel from "@/components/panel/pages/event/add/EventAddViewModel";


export default function PanelAddEvent() {
  const { cities, categories, upload, refImage, isLoading, image } = EventAddViewModel();

  // const [errMessage, setErrMessage] = useState("");
  const loading = useContext(LoadingContext);
  const router = useRouter()

  return (
    <div className="">
      <Formik
        initialValues={storeEventInit}
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
              try {
                loading?.setLoading(true);
                const res = await createEvent(values);

                if (res?.error) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong, please try again later!",
                  });
                } else {
                  Swal.fire({
                    title: "Saved!",
                    text: "Your new event has been created.",
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
              <InputField type="text" id="name" name="name" label="Name" placeholder="" required />
              <InputField type="text" id="host_name" name="host_name" label="Host Name" placeholder="" required />
              <InputField type="date" id="date" name="date" label="Date" placeholder="" required />
              <div className="md:flex gap-2">
                <InputField type="time" id="start_time" name="start_time" label="Start Time" placeholder="" required />
                <InputField type="time" id="end_time" name="end_time" label="End Time" placeholder="" required />
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
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Description Image</label>
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
                  src={isLoading ? "/spinner.gif" : image || DefaultImage}
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

                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          price: "",
                          quota: "",
                        }) // Add new empty ticket
                      }
                      className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                      + Add Ticket
                    </button>
                  </div>
                  {formik.values.ticket_types.map((ticket, index) => (
                    <div key={index} className="flex gap-2 items-center mt-3">
                      <div className="md:flex gap-4  w-full">
                        <InputField type="text" id={`ticket_types[${index}].name`} name={`ticket_types[${index}].name`} label="" placeholder="name" required />
                        <InputField type="number" id={`ticket_types[${index}].price`} name={`ticket_types[${index}].price`} label="" placeholder="quota" required />
                        <InputField type="number" id={`ticket_types[${index}].quota`} name={`ticket_types[${index}].quota`} label="" placeholder="price" required />
                      </div>

                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 transition duration-200"
                        onClick={() => arrayHelpers.remove(index)} // Remove ticket
                      >
                        <XCircleIcon className="w-6 h-6" />
                      </button>
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

                <button
                  type="submit"
                  onClick={() => router.push("/panel/events")}
                  className={"bg-gray-50 border border-gray-300 text-gray-400font-semibold px-5 py-3 rounded mb-6"}
                >
                  Back
                </button>
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
