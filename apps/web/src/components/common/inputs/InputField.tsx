import { FormikProps } from "formik";
import React from "react";

interface Props {
    id: string;
    type: string;
    name: string;
    label: string;
    required?: boolean
    formik: FormikProps<any>;
}

export const InputField = ({ id, type, name, label, formik, required = false }: Props) => {
    const errorMessage = formik.touched[name] && formik.errors[name];
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label} {!required && <span className="text-gray-500">(optional)</span>}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required={required}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errorMessage && (
                <p className="mb-4 text-red-400">
                    {typeof errorMessage == 'string' && errorMessage}
                </p>
            )}
        </div>
    );
};
