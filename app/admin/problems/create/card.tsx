"use client";

import { Card } from "@/components/card";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { Problem, useProblemService } from "@/lib/problem";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { AdminProblemForm } from "../form";

export const AdminCreateProblemCard: React.FC = () => {
  const axios = useAxios();
  const problemService = useProblemService(axios);
  const router = useRouter();

  const createProblem = useCallback(
    (problem: Omit<Problem, "utcCreated" | "utcLastModified">) => {
      console.log(problem);
      return problemService
        .createProblem(problem)
        .then((pid) => router.push(`/admin/problems/${pid}`));
    },
    [problemService, router]
  );

  return (
    <Card
      title={
        <Title as="h2" size="2xl">
          添加题目
        </Title>
      }
    >
      <AdminProblemForm onSubmit={createProblem} />
    </Card>
  );
};
