/** @format */
"use client";

import { Alert, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { checkResetPasswordToken, forgetPassword, register, resetPassword } from "@/helpers/handlers/apis/auth";

import * as Yup from "yup"

export default function Page() {
    const [errMessage, setErrMessage] = useState("");
    const open = useRef(false);

    const formik = useFormik({
        validationSchema: Yup.object({
            email: Yup.string().min(4).required("Email is required"),
        }),
        initialValues: {
            email: "",
        },
        onSubmit: async (values) => {
            setErrMessage("");
            await forgetPassword(values).then((res: any) => {
                if (res?.error) {
                    setErrMessage(res.error);
                } else {
                    open.current = true;
                    formik.resetForm();

                    // setTimeout(() => {
                    //     router.push("/login");
                    // }, 1000);
                }
            });
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <div className="mb-4">
                    <h4 className="text-2xl font-bold mb-2">Forget Password</h4>
                    <h5 className="mb-4">
                        {"Already have an account? "}
                        <Link href={"/login"} className="text-green-600 font-semibold">
                            Sign in here
                        </Link>
                    </h5>
                </div>
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
                        placeholder="Your Email"
                        name="email"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <p className="text-sm text-red-600">{formik.errors?.email}</p>

                    <p className="text-sm text-red-600">{errMessage}</p>
                    <button
                        className={`${!(formik.isValid && formik.dirty) || formik.isSubmitting
                            ? "bg-gray-300 text-gray-400"
                            : "bg-green-600 text-white"
                            } font-semibold p-4 w-full rounded-full transition duration-300 hover:bg-green-700 disabled:bg-gray-300`}
                        disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Processing..." : "Submit"}
                    </button>
                    <p className="text-center text-gray-500 text-sm">
                        Your data will be protected and will not be shared
                    </p>
                </form>
                <Snackbar
                    open={open.current}
                    autoHideDuration={1500}
                    onClose={() => {
                        open.current = false;
                    }}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                        Your password change request has been sent to your email
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}
