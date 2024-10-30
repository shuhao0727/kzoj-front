import classNames from "classnames";
import React, { useMemo } from "react";

export const Button: React.FC<
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    type: "info" | "success" | "warning" | "danger";
    size?: "sm";
    icon?: React.ComponentType<
      React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
    >;
    htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    loading?: boolean;
  }
> = ({
  type,
  size,
  icon,
  htmlType,
  className,
  children,
  disabled,
  loading,
  ...props
}) => {
  const Icon = useMemo(() => icon, [icon]);
  return (
    <button
      {...props}
      type={htmlType}
      disabled={disabled || loading}
      className={classNames(
        className,
        size === "sm" ? "text-sm" : "",
        "w-full flex w-full justify-center items-center rounded-md px-3 py-1.5 font-semibold text-white shadow-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        type === "info"
          ? disabled
            ? "bg-blue-100"
            : "bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600"
          : type === "success"
          ? disabled
            ? "bg-green-100"
            : "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600"
          : type === "warning"
          ? disabled
            ? "bg-yellow-100"
            : "bg-yellow-400 hover:bg-yellow-500 focus-visible:outline-yellow-600"
          : type === "danger"
          ? disabled
            ? "bg-red-100"
            : "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
          : ""
      )}
    >
      {!loading ? (
        <>
          {Icon && (
            <Icon
              className={classNames(
                "mr-1",
                size === "sm" ? "w-3 h-3" : "w-4 h-4"
              )}
            />
          )}
          {children}
        </>
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
