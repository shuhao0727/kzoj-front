"use client";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/form/input";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { config } from "@/lib/config";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/states/auth";
import { useUserService } from "@/lib/user";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";

export const AuthLoginCard: React.FC = () => {
  const axios = useAxios();
  const userService = useUserService(axios);
  const dispatch = useAppDispatch();
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
        <Alert type="error">
          <p>登录失败，请检查用户或密码。</p>
        </Alert>
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
            .then((user) => {
              dispatch(login(user));
              router.push(redirect);
            })
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
