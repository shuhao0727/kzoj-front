"use client";

import { useAxios } from "@/lib/axios";
import { useUserService } from "@/lib/user";
import { IconIdCard, IconLock, IconMail, IconUser } from "@douyinfe/semi-icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Notification,
  Spin,
  Typography,
} from "@douyinfe/semi-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const AuthRegisterPage: React.FC = () => {
  const axios = useAxios();
  const userService = useUserService(axios);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const doRegister = useCallback(
    (username: string, password: string, realName: string, email: string) => {
      setLoading(true);
      userService
        .register(
          {
            username: username,
            realName: realName,
            email: email,
          },
          password
        )
        .then((user) => {
          Notification.success({
            title: "注册成功",
            content: `欢迎使用，${user.username}！`,
          });
          router.push("/main/index");
        })
        .catch((error) => {
          Notification.error({
            title: "注册失败",
            content: String(error),
          });
        })
        .finally(() => setLoading(false));
    },
    [router, setLoading]
  );

  return (
    <Card>
      <div className="flex items-end">
        <Typography.Title heading={2}>用户注册</Typography.Title>
        <span className="ml-auto">
          <Link href="/auth/login">返回登录</Link>
        </span>
      </div>
      <Divider />
      <Form
        disabled={loading}
        onSubmit={(values) =>
          doRegister(
            values.username,
            values.password,
            values.realName,
            values.email
          )
        }
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
              type="password"
              className="w-full"
              prefix={<IconLock />}
              validate={(password) => (!password ? "密码不能为空" : "")}
            />
            <Form.Input
              field="realName"
              label="姓名"
              className="w-full"
              prefix={<IconIdCard />}
              validate={(realName) => (!realName ? "姓名不能为空" : "")}
            />
            <Form.Input
              field="email"
              label="邮箱"
              className="w-full"
              prefix={<IconMail />}
              validate={(email) =>
                !email
                  ? "邮箱不能为空"
                  : !/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,6}$/.test(email)
                  ? "邮箱地址不合法"
                  : ""
              }
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
              {loading ? <Spin /> : "注册"}
            </Button>
          </>
        )}
      </Form>
    </Card>
  );
};

export default AuthRegisterPage;
