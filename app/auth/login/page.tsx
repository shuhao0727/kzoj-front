"use client";

import { login } from "@/lib/user";
import { IconLock, IconUser } from "@douyinfe/semi-icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Notification,
  Spin,
  Typography,
} from "@douyinfe/semi-ui";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

const AuthLoginPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  const redirect = useMemo(
    () => searchParams.get("redirect") ?? "/main/index",
    [searchParams]
  );

  const doLogin = useCallback(
    (username: string, password: string) => {
      setLoading(true);
      login(username, password)
        .then((user) => {
          Notification.success({
            title: "登录成功",
            content: `欢迎回来，${user.username}！`,
          });
          router.push(redirect);
        })
        .catch((error) => {
          Notification.error({
            title: "登录失败",
            content: String(error),
          });
        })
        .finally(() => setLoading(false));
    },
    [router, redirect, setLoading]
  );

  return (
    <Card>
      <Typography.Title heading={2}>用户登陆</Typography.Title>
      <Divider />
      <Form
        disabled={loading}
        onSubmit={(values) => doLogin(values.username, values.password)}
      >
        {({ formState }) => (
          <>
            <Form.Input
              field="username"
              label="用户"
              className="w-full"
              prefix={<IconUser />}
              validate={(username) => (!username ? "用户不能为空" : "")}
            />
            <Form.Input
              field="password"
              label="密码"
              className="w-full"
              type="password"
              prefix={<IconLock />}
              validate={(password) => (!password ? "密码不能为空" : "")}
            />
            <Button
              htmlType="submit"
              className="w-full mt-2"
              disabled={
                loading ||
                Object.values(formState.errors || {}).filter((x) => !!x)
                  .length > 0
              }
            >
              {loading ? <Spin /> : "登陆"}
            </Button>
          </>
        )}
      </Form>
    </Card>
  );
};

export default AuthLoginPage;
