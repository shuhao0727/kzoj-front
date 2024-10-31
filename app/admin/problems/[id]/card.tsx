"use client";

import { Alert } from "@/components/alert";
import { Card } from "@/components/card";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { Problem, useProblemService } from "@/lib/problem";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { AdminProblemForm } from "../form";

export const AdminUpdateProblemCard: React.FC = () => {
  const axios = useAxios();
  const problemService = useProblemService(axios);
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const {
    data: problem,
    isLoading,
    error,
  } = useSWR(`/problems/${params.id}`, () =>
    problemService.queryProblemById(Number.parseInt(params.id))
  );

  const updateProblem = useCallback(
    (problem: Omit<Problem, "utcCreated" | "utcLastModified">) => {
      return problemService.updateProblem(problem).then(() =>
        mutate(`/problems/${params.id}`, undefined, {
          revalidate: true,
        })
      );
    },
    [problemService, router]
  );

  return (
    <Card
      title={
        <Title as="h2" size="2xl">
          {isLoading
            ? "正在加载"
            : !!error
            ? "加载失败"
            : `更新题目 P${String(problem?.id).padStart(4, "0")}`}
        </Title>
      }
    >
      {!!error ? (
        <Alert type="error" title="获取题目失败">
          {error}
        </Alert>
      ) : (
        !!problem && (
          <AdminProblemForm problem={problem} onSubmit={updateProblem} />
        )
      )}
    </Card>
  );
};
