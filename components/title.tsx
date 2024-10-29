import classNames from "classnames";
import React from "react";

export const Title: React.FC<
  React.PropsWithChildren<{
    as: "h1" | "h2" | "h3" | "h4";
    size: "md" | "lg" | "xl" | "2xl" | "3xl";
    bold?: "medium" | "bold" | "semibold";
  }>
> = ({ as, size, bold, children }) => {
  const As = as;
  return (
    <As
      className={classNames(
        size === "md"
          ? "text-md"
          : size === "lg"
          ? "text-lg"
          : size === "xl"
          ? "text-xl"
          : size === "2xl"
          ? "text-2xl"
          : size === "3xl"
          ? "text-3xl"
          : "",
        bold ? `font-${bold}` : ""
      )}
    >
      {children}
    </As>
  );
};
