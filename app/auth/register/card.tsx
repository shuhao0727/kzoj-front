"use client";

import { Alert } from "@/components/alert";
import { Card } from "@/components/card";
import { Error } from "@/components/form/error";
import { Input } from "@/components/form/input";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { useUserService } from "@/lib/user";
import classNames from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";

export const AuthRegisterCard: React.FC = () => {
  const axios = useAxios();
  const userService = useUserService(axios);
  const router = useRouter();

  const [error, setError] = useState<string>();

  return (
    <Card>
      <div className="flex items-end">
        <Title as="h2" size="2xl">
          用户注册
        </Title>
        <span className="ml-auto">
          <Link href="/auth/login">返回登录</Link>
        </span>
      </div>
      {error && (
        <Alert type="error" title="注册失败">
          <p>{String(error)}</p>
        </Alert>
      )}
      <hr className="mb-2" />
      <Formik
        initialValues={{ username: "", password: "", realName: "", email: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("用户不能为空"),
          password: Yup.string().required("密码不能为空"),
          realName: Yup.string().required("真实姓名不能为空"),
          email: Yup.string()
            .email("电子邮件不合法")
            .required("电子邮件不能为空"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          userService
            .register(
              {
                username: values.username,
                realName: values.realName,
                email: values.email,
              },
              values.password
            )
            .then(() => router.push("/main/index"))
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
            <Field
              component={Input}
              name="realName"
              type="text"
              label="真实姓名"
              className="mt-2"
            />
            <ErrorMessage name="realName" component={Error} />
            <Field
              component={Input}
              name="email"
              type="email"
              label="电子邮件"
              className="mt-2"
            />
            <ErrorMessage name="email" component={Error} />
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
