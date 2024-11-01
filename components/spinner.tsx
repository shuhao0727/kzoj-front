import classNames from "classnames";
import React from "react";

export const Spinner: React.FC<{ size?: "md" | "lg" | "xl" }> = ({ size }) => (
  <div
    role="status"
    className={classNames(
      size === "md"
        ? "h-6 w-6 border-4"
        : size === "lg"
        ? "h-8 w-8 border-[0.22rem]"
        : size === "xl"
        ? "h-10 w-10 border-[0.3rem]"
        : "",
      "inline-block rounded-full border-solid border-current border-e-transparent align-[-0.125em] text-surface",
      "animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
    )}
  >
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      正在加载...
    </span>
  </div>
);
