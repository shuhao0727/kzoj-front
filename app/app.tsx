"use client";

import { Alert } from "@/components/alert";
import { Spinner } from "@/components/spinner";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login, logout, selectUser } from "@/lib/states/auth";
import { persistor, store } from "@/lib/store";
import { useUserService } from "@/lib/user";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import useSWR from "swr";

export const ReduxAwareApp: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const axios = useAxios(false);
  const userService = useUserService(axios);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  const { error } = useSWR(
    "/user/self",
    () =>
      userService
        .getSelf()
        .then((user) => dispatch(login(user)))
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            dispatch(logout());
          } else {
            return Promise.reject(null);
          }
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      refreshInterval: 5 * 60 * 1000,
    }
  );

  if (typeof currentUser === "undefined") {
    return (
      <div className="flex-grow bg-gray-50">
        <div className="mx-auto mt-12">
          {!!error ? (
            <Alert type="error" title="无法获取信息">
              {error}
            </Alert>
          ) : (
            <div className="flex flex-col animate-pulse">
              <div className="mx-auto mb-2">
                <Spinner size="lg" />
              </div>
              <div className="mx-auto">
                <Title as="h1" size="2xl">
                  正在加载
                </Title>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return children;
  }
};

export const Application: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Provider store={store}>
    <PersistGate
      loading={<div className="flex-grow bg-gray-50" />}
      persistor={persistor}
    >
      <ReduxAwareApp>{children}</ReduxAwareApp>
    </PersistGate>
  </Provider>
);
