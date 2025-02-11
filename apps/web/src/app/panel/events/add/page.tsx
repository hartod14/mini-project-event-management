"use client";

// import EventsAddViewModel from "@/components/Panel/pages/event/add/EventsAddViewModel";
import React from "react";
import { useFormik } from "formik"
import { storeEventValidator } from "@/validators/event.validator";
import { storeEventInit } from "@/helpers/formiks/event.formik";
import { Alert, Snackbar } from "@mui/material";
import { InputField } from "@/components/common/inputs/InputField";

// import EventsAddView from "@/components/pages/landing-page/events/add/EventsAddView";
// const { errors, handleSubmit, id, onSubmit, register, reset, router, urlImage, watch, getValues, setValue } = EventsAddViewModel();

export default function PanelAddEvent() {
  const [errMessage, setErrMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    validationSchema: storeEventValidator,
    initialValues: storeEventInit,
    onSubmit: async (values) => {
      try {
        setErrMessage("");
        // await reg  ister(values);
        setOpen(true);
        formik.resetForm();
      } catch (error) {
        if (error instanceof Error) setErrMessage(error.message);
      }
    },
  });

  return (
    <div className="">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <InputField type="text" id="name" name="name" label="Name" formik={formik} />
          <InputField type="text" id="host_name" name="host_name" label="Host Name" formik={formik} />
          <InputField type="datetime-local" id="start_date" name="start_date" label="Start Date" formik={formik} />
          <InputField type="datetime-local" id="end_date" name="end_date" label="End Date" formik={formik} />
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
