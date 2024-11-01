"use client";

import classNames from "classnames";
import { FieldProps } from "formik";
import React, { useMemo } from "react";
import { Error } from "./error";

import MarkdownKatex from "@vscode/markdown-it-katex";
import MarkdownIt from "markdown-it";
const md = MarkdownIt();
md.use(MarkdownKatex);

const __Textarea: React.FC<
  FieldProps &
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      large?: boolean;
      monospace?: boolean;
    }
> = ({ field, form, meta, large, monospace, onBlur, onInput, ...props }) => {
  return (
    <textarea
      {...field}
      {...props}
      className={classNames(
        large ? `min-h-[16rem]` : `min-h-[8rem]`,
        monospace ? "font-mono" : "",
        "block w-full py-1.5 resize-none rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300",
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
  );
};

export const Textarea: React.FC<
  FieldProps &
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      label?: string;
      large?: boolean;
      markdown?: boolean;
      monospace?: boolean;
    }
> = ({ field, label, large, markdown, className, ...props }) => {
  const html = useMemo(
    () => (!markdown ? "" : md.render(field.value ?? "")),
    [markdown, field]
  );
  return (
    <div className={className}>
      {label && (
        <label htmlFor={field.name} className="block text-gray-900">
          {label}
        </label>
      )}
      {!markdown ? (
        <__Textarea field={field} large={large} {...props} />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <__Textarea field={field} large={large} {...props} />
          </div>
          <div
            className={classNames(
              "markdown-body p-4 overflow-auto rounded-md bg-gray-100",
              large ? `h-[16rem]` : `h-[8rem]`
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
      <div>
        <Error name={field.name} />
      </div>
    </div>
  );
};
