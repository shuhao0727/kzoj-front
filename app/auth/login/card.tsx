"use client";

import { Card } from "@/components/card";
import { Error } from "@/components/form/error";
import { Input } from "@/components/form/input";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { config } from "@/lib/config";
import { useUserService } from "@/lib/user";
import classNames from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";

export const AuthLoginCard: React.FC = () => {
  const axios = useAxios();
  const userService = useUserService(axios);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string>();
  const redirect = useMemo(
    () => searchParams.get("redirect") ?? "/main/index",
    [searchParams]
  );

  return (
    <Card>
      <div className="flex items-end">
        <Title as="h2" size="2xl">
          用户登录
        </Title>
        {config.registerEnabled && (
          <span className="ml-auto">
            <Link href="/auth/register">注册用户</Link>
          </span>
        )}
      </div>
      {error && (
        <div className="bg-red-100 my-2 p-4 border-l-4 border-red-500">
          登录失败，请检查用户或密码。
        </div>
      )}
      <hr className="mb-2" />
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("用户不能为空"),
          password: Yup.string().required("密码不能为空"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          userService
            .login(values.username, values.password)
            .then(() => router.push(redirect))
            .catch((error) => setError(String(error)))
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field component={Input} name="username" type="text" label="用户" />
            <ErrorMessage name="username" component={Error} />
            <Field
              component={Input}
              name="password"
              type="password"
              label="密码"
              className="mt-2"
            />
            <ErrorMessage name="password" component={Error} />
            <button
              type="submit"
              disabled={isSubmitting}
              className={classNames(
                "w-full mt-4 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 font-semibold text-white shadow-sm",
                "hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              )}
            >
              登录
            </button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
