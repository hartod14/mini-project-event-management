/** @format */
"use client";

import { Alert, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { registerValidator } from "@/validators/auth.validator";
import { registerInit } from "@/helpers/formiks/formik.init";
import { checkResetPasswordToken, register, resetPassword } from "@/helpers/handlers/apis/auth";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup"

export default function Page() {
    const [errMessage, setErrMessage] = React.useState("");
    const [userId, setUserId] = useState<number>()
    const open = useRef(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");


    useEffect(() => {
        async function fetchInvalidToken() {
            try {
                const checkValidToken = await checkResetPasswordToken(String(token));

                const userID = checkValidToken.data.id
                setUserId(userID)
            } catch (error) {
                alert("Invalid Token")
                setInterval(() => {
                    router.push('/')
                }, 1000);
            }
        }
        fetchInvalidToken()
    }, [])


    const formik = useFormik({
        validationSchema: Yup.object({
            password: Yup.string()
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Password must contain at least 8 characters, one uppercase, one number, and one special case character"
                )
                .required("Password is required"),
            confirmPassword: Yup.string()
                .required("Password Confirmation is required")
                .oneOf([Yup.ref("password")], "Passwords must match"),
        }),
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        onSubmit: async (values: any) => {
            setErrMessage("");
            await resetPassword(Number(userId), values).then((res) => {
                if (res?.error) {
                    setErrMessage(res.error);
                } else {
                    open.current = true;
                    formik.resetForm();

                    setTimeout(() => {
                        router.push("/login");
                    }, 1000);
                }
            });
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <div className="mb-4">
                    <h4 className="text-2xl font-bold mb-2">Change Your Password</h4>
                </div>
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <input
                        type="password"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
                        placeholder="Password"
                        name="password"
                        required
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <p className="text-sm text-red-600">{formik.errors?.password}</p>
                    <input
                        type="password"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />
                    <p className="text-sm text-red-600">{formik.errors.confirmPassword}</p>

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
                        Change Password Success
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}
