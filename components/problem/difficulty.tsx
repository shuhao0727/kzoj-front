import { Difficulties, Difficulty as DType } from "@/lib/problem";
import classNames from "classnames";
import React from "react";

export const Difficulty: React.FC<{ difficulty: DType }> = ({ difficulty }) => {
  return (
    <span
      className={classNames(
        Difficulties[difficulty].className,
        "px-2 py-1 rounded-md text-sm text-white"
      )}
    >
      {Difficulties[difficulty].labelText.substring(0, 3)}
    </span>
  );
};
