import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";


interface Option {
  label: string;
  value: string;
}

interface InputSelectMultipleProps extends FieldProps {
  options: any;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  isDisabled?:boolean
}

export const InputSelectMultiple = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,isDisabled
}: InputSelectMultipleProps) => {
  const onChange = (option: any) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option:any) => field.value.indexOf(option.value) >= 0)
        : options.find((option:any) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      isDisabled={isDisabled}
    />
  );
};

export default InputSelectMultiple;