"use client";

// import EventsAddViewModel from "@/components/Panel/pages/event/add/EventsAddViewModel";
import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { InputField } from "@/components/common/inputs/InputField";
import { InputFieldTextarea } from "@/components/common/inputs/InputFieldTextarea";
import EventAddViewModel from "@/components/Panel/pages/event/add/EventAddViewModel";
import { InputSelect } from "@/components/common/inputs/InputSelect";
import RichTextEditor from "@/components/common/inputs/RichTextEditor";

// import EventsAddView from "@/components/pages/landing-page/events/add/EventsAddView";

export default function PanelAddEvent() {
  const { errMessage, open, setOpen, formik, cities, categories } = EventAddViewModel();

  return (
    <div className="">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <InputField type="text" id="name" name="name" label="Name" formik={formik} />
          <InputField type="text" id="host_name" name="host_name" label="Host Name" formik={formik} />
          <InputField type="date" id="date" name="date" label="Date" formik={formik} />
          <InputField type="time" id="start_time" name="start_time" label="Start Time" formik={formik} />
          <InputField type="time" id="end_time" name="end_time" label="End Time" formik={formik} />
          <InputFieldTextarea id="address" name="address" label="Address" formik={formik} />
          <InputSelect id="city_id" name="city_id" label="Select City" options={cities} formik={formik} />
          <InputSelect id="event_category_id" name="event_category_id" label="Select Category" options={categories} formik={formik} />
          <RichTextEditor id="description" name="description" formik={formik} />
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
