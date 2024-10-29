import React from "react";

export const Card: React.FC<
  React.PropsWithChildren<{ title?: React.ReactElement }>
> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-md p-6 ring-1 ring-inset ring-gray-300">
      {!!title && (
        <div className="mb-4">
          {title}
          <hr />
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
