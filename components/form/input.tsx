import classNames from "classnames";
import { FieldProps } from "formik";
import React from "react";
import { Error } from "./error";

export const Input: React.FC<
  FieldProps & React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
  // eslint-disable-next-line
> = ({ field, form, meta, label, className, onBlur, onInput, ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={field.name} className="block text-gray-900">
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        className={classNames(
          "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300",
          "focus:ring-2 focus:ring-inset focus:ring-blue-600"
        )}
        onBlur={(event) => {
          form.setFieldTouched(field.name);
          onBlur?.(event);
        }}
        onInput={(event) => {
          form.setFieldTouched(field.name);
          onInput?.(event);
        }}
      />
      <div>
        <Error name={field.name} />
      </div>
    </div>
  );
};
