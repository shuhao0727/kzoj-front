import classNames from "classnames";
import React from "react";

export const Error: React.FC<
  { message?: string } & React.BaseHTMLAttributes<HTMLDivElement>
> = ({ message, className, ...props }) => {
  return (
    <>
      {message && (
        <div className={classNames("text-red-500", className)} {...props}>
          {message}
        </div>
      )}
    </>
  );
};
