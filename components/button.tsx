import classNames from "classnames";
import React from "react";

export const Button: React.FC<
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    type: "info" | "success" | "danger";
    htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    loading?: boolean;
  }
> = ({ type, htmlType, className, children, disabled, loading, ...props }) => {
  return (
    <button
      {...props}
      type={htmlType}
      disabled={disabled || loading}
      className={classNames(
        className,
        "w-full flex w-full justify-center rounded-md px-3 py-1.5 font-semibold text-white shadow-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        type === "info"
          ? disabled
            ? "bg-blue-100"
            : "bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600"
          : type === "success"
          ? disabled
            ? "bg-green-100"
            : "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600"
          : type === "danger"
          ? disabled
            ? "bg-red-100"
            : "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
          : ""
      )}
    >
      {!loading ? (
        children
      ) : (
        <div
          role="status"
          className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </button>
  );
};
