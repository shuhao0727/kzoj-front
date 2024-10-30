import { ErrorMessage } from "formik";
import React from "react";

export const Error: React.FC<{ name: string }> = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(message) => <p className="text-red-500">{String(message)}</p>}
    </ErrorMessage>
  );
};
