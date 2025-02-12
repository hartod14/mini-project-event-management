import { FormikProps } from "formik";
import React from "react";

interface InputFieldProps {
    id: string;
    name: string;
    label: string;
    options: Array<any>;
    required?: boolean
    formik: FormikProps<any>;
}

export const InputSelect = ({ id, name, label, options, formik, required = false }: InputFieldProps) => {
    const errorMessage = formik.touched[name] && formik.errors[name];
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label} {!required && <span className="text-gray-500">(optional)</span>}
            </label>
            <select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                required={required}
                name={name}
                id={id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""></option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {errorMessage && (
                <p className="mb-4 text-red-400">
                    {typeof errorMessage == 'string' && errorMessage}
                </p>
            )}
        </div>
    );
};
