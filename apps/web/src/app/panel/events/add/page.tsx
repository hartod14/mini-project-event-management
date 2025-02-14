"use client";

// import EventsAddViewModel from "@/components/Panel/pages/event/add/EventsAddViewModel";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { InputField } from "@/components/common/inputs/InputField";
import { InputFieldTextarea } from "@/components/common/inputs/InputFieldTextarea";
import { InputSelect } from "@/components/common/inputs/InputSelect";
import RichTextEditor from "@/components/common/inputs/RichTextEditor";
import Image from "next/image";
import { uploadImage } from "@/helpers/handlers/upload";
import DefaultImage from "@/../public/default_image.jpg"
import Spinner from "@/../public/spinner.gif"
import { ArrowUpTrayIcon, SignalIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { SwitchField } from "@/components/common/inputs/SwitchField";
import EventAddViewModel, { Ticket } from "@/components/Panel/pages/event/add/EventAddViewModel";
import { FieldArray, Formik, Form, Field, ErrorMessage } from "formik";
import { storeEventValidator } from "@/validators/event.validator";
import { storeEventInit } from "@/helpers/formiks/event.formik";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { LoadingContext } from "@/context/LoadingContext";
import { createEvent } from "@/helpers/handlers/apis/event.api";


export default function PanelAddEvent() {
  const { cities, categories, upload, refImage, isLoading, image } = EventAddViewModel();

  const [errMessage, setErrMessage] = useState("");
  const loading = useContext(LoadingContext);
  const router = useRouter()

  return (
    <div className="">
      <Formik
        initialValues={storeEventInit}
        validationSchema={storeEventValidator}
        onSubmit={(values) => alert(JSON.stringify(values, null, 3))}
      // onSubmit={async (values) => {
      //   Swal.fire({
      //     title: "Save this new event?",
      //     icon: "warning",
      //     showCancelButton: true,
      //     confirmButtonColor: "#3085d6",
      //     cancelButtonColor: "#d33",
      //     confirmButtonText: "Yes, save it!",
      //     cancelButtonText: "Cancel"
      //   }).then(async (result) => {
      //     if (result.isConfirmed) {
      //       try {
      //         loading?.setLoading(true);
      //         setErrMessage("");

      //         const res = await createEvent(values);
      //         if (res?.error) {
      //           setErrMessage(res.error);
      //         } else {
      //           // formik.resetForm();
      //         }
      //       } catch (error) {
      //         if (error instanceof Error) {
      //           setErrMessage(error.message);
      //         }
      //       } finally {
      //         Swal.fire({
      //           title: "Saved!",
      //           text: "Your new event has been created.",
      //           icon: "success",
      //           confirmButtonColor: "#3085d6",
      //         }).then(() => {
      //           router.push("/panel/events");
      //         });

      //         loading?.setLoading(false);
      //       }
      //     }
      //   });
      // }}
      >
        {(formik) => (
          <Form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {/* <Field placeholder={'Name'} name={'name'} />
              <ErrorMessage name={`name`} /> */}
              <InputField type="text" id="name" name="name" label="Name" formik={formik} required />
              <InputField type="text" id="host_name" name="host_name" label="Host Name" formik={formik} required />
              <InputField type="date" id="date" name="date" label="Date" formik={formik} required />
              <InputField type="time" id="start_time" name="start_time" label="Start Time" formik={formik} required />
              <InputField type="time" id="end_time" name="end_time" label="End Time" formik={formik} required />
              <InputFieldTextarea id="address" name="address" label="Address" formik={formik} required />
              <InputSelect id="city_id" name="city_id" label="Select City" options={cities} formik={formik} required />
              <InputSelect id="event_category_id" name="event_category_id" label="Select Category" options={categories} formik={formik} required />
              <InputFieldTextarea id="description" name="description" label="Description" formik={formik} />
              <InputFieldTextarea id="term_condition" name="term_condition" label="Term & Condition" formik={formik} />
              <SwitchField id="status" name="status" label="Status" formik={formik} />
              {/* <RichTextEditor id="description" name="description" formik={formik} /> */}
            </div>
            <FieldArray
              name="tickets"
              render={(arrayHelpers) => (
                <>
                  {formik.values.tickets.map((ticket, index) => (
                    <div key={index} className="flex gap-2 items-center mt-3">
                      <div className="md:flex gap-4 mb-4 w-full">
                        <Field
                          placeholder="user name" name={`tickets[${index}].name`}
                          onChange={formik.handleChange} />
                        <ErrorMessage name={`tickets[${index}].name`} />
                        <Field
                          placeholder="user name" name={`tickets[${index}].price`}
                          onChange={formik.handleChange}
                        />
                        <ErrorMessage name={`tickets[${index}].price`} />
                        <Field
                          placeholder="user name" name={`tickets[${index}].quota`}
                          onChange={formik.handleChange}
                        />
                        <ErrorMessage name={`tickets[${index}].quota`} />
                        {/* <input
                          type="text"
                          id={`ticket-name-${index}`}
                          name={`tickets[${index}].name`}
                          value={ticket.name}
                          onChange={formik.handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Ticket Name"
                        />

                        <input
                          type="number"
                          id={`ticket-price-${index}`}
                          name={`tickets[${index}].price`}
                          value={ticket.price}
                          onChange={formik.handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Price"
                        />
                        <input
                          type="number"
                          id={`ticket-quota-${index}`}
                          name={`tickets[${index}].quota`}
                          value={ticket.quota}
                          onChange={formik.handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Quota"
                        /> */}
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
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        name: "",
                        price: "",
                        quota: "",
                      }) // Add new empty ticket
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                  >
                    + Add Ticket
                  </button>
                </>
              )}
            />

            {/* <div>
              <div className=" my-10">
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Description Image</label>
                  <button
                    type="button"
                    onClick={() => refImage.current?.click()}
                    className={`${isLoading ? 'bg-blue-200' : 'bg-blue-700'} px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    disabled={isLoading}
                  >
                    <div className="flex gap-2 items-center"><ArrowUpTrayIcon width={24} height={24} />{isLoading ? "Uploading..." : "Upload image"}</div>
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
                  onChange={upload}
                />
              </div>
            </div>

            <p className="mb-4 text-red-400">{errMessage}</p> */}

            {/* <button type="submit">
              submit
            </button> */}
            <button
              type="submit"
              className={`${!(formik.isValid && formik.dirty) || formik.isSubmitting
                ? "bg-gray-300 text-gray-400"
                : "bg-[#159953] text-white"
                }   font-semibold p-4 w-full rounded-[50px] mb-6`}
              disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
            >
              {formik.isSubmitting ? "Processing..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>

    </div >
  );
}
