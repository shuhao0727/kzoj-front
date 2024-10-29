import classNames from "classnames";
import React from "react";
import { Title } from "./title";

export const Alert: React.FC<
  React.PropsWithChildren<{
    type: "success" | "info" | "error";
    title?: string;
  }>
> = ({ type, title, children }) => {
  return (
    <div
      className={classNames(
        "my-2 p-4 border-l-4",
        type === "success"
          ? "bg-green-100 border-green-500"
          : type === "info"
          ? "bg-blue-100 border-blue-500"
          : "bg-red-100 border-red-500"
      )}
    >
      {title && (
        <Title as="h2" size="xl">
          {title}
        </Title>
      )}
      <div>{children}</div>
    </div>
  );
};
