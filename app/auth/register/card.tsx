"use client";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/form/input";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/states/auth";
import { useUserService } from "@/lib/user";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";

export const AuthRegisterCard: React.FC = () => {
  const axios = useAxios();
  const userService = useUserService(axios);
  const dispatch = useAppDispatch();

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
            .then((user) => dispatch(login(user)))
            .catch((error) => setError(String(error)))
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Field component={Input} name="username" type="text" label="用户" />
            <Field
              component={Input}
              name="password"
              type="password"
              label="密码"
            />
            <Field
              component={Input}
              name="realName"
              type="text"
              label="真实姓名"
            />
            <Field
              component={Input}
              name="email"
              type="email"
              label="电子邮件"
            />
            <Button
              htmlType="submit"
              type="info"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              登录
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
