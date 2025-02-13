"use client";

// import EventsAddViewModel from "@/components/Panel/pages/event/add/EventsAddViewModel";
import React, { useCallback, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { InputField } from "@/components/common/inputs/InputField";
import { InputFieldTextarea } from "@/components/common/inputs/InputFieldTextarea";
import { InputSelect } from "@/components/common/inputs/InputSelect";
import RichTextEditor from "@/components/common/inputs/RichTextEditor";
import EventAddViewModel from "@/components/Panel/pages/event/add/EventAddViewModel";
import Image from "next/image";
import { uploadImage } from "@/helpers/handlers/upload";
import DefaultImage from "@/../public/default_image.jpg"
import Spinner from "@/../public/spinner.gif"
import { ArrowUpTrayIcon, SignalIcon } from "@heroicons/react/24/outline";
import { SwitchField } from "@/components/common/inputs/SwitchField";

// import EventsAddView from "@/components/pages/landing-page/events/add/EventsAddView";

export default function PanelAddEvent() {
  const { errMessage, open, setOpen, formik, cities, categories, upload, refImage, isLoading, image } = EventAddViewModel();

  return (
    <div className="">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <InputField type="text" id="name" name="name" label="Name" formik={formik} required />
          <InputField type="text" id="host_name" name="host_name" label="Host Name" formik={formik} required />
          <InputField type="date" id="date" name="date" label="Date" formik={formik} required />
          <InputField type="time" id="start_time" name="start_time" label="Start Time" formik={formik} required />
          <InputField type="time" id="end_time" name="end_time" label="End Time" formik={formik} required />
          <InputFieldTextarea id="address" name="address" label="Address" formik={formik} required />
          <InputSelect id="city_id" name="city_id" label="Select City" options={cities} formik={formik} required />
          <InputSelect id="event_category_id" name="event_category_id" label="Select Category" options={categories} formik={formik} required />
          {/* <RichTextEditor id="description" name="description" formik={formik} /> */}
          <InputFieldTextarea id="description" name="description" label="Description" formik={formik} />
          <InputFieldTextarea id="term_confition" name="term_confition" label="Term & Condition" formik={formik} />
          <SwitchField id="status" name="status" label="Status" formik={formik} required />
        </div>
        <div>
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

        <p className="mb-4 text-red-400">{errMessage}</p>

        <button
          className={`${!(formik.isValid && formik.dirty) || formik.isSubmitting
            ? "bg-gray-300 text-gray-400"
            : "bg-[#159953] text-white"
            }   font-semibold p-4 w-full rounded-[50px] mb-6`}
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? "Processing..." : "Register"}
        </button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        message="Login Success"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Create Event Success
        </Alert>
      </Snackbar>
    </div>
  );
}
