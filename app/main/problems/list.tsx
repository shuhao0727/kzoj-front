"use client";

import { Card } from "@/components/card";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { useProblemService } from "@/lib/problem";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import useSWR from "swr";

export const MainProblemsListTable: React.FC = () => {
  const axios = useAxios();
  const problemService = useProblemService(axios);
  const searchParams = useSearchParams();

  const page = useMemo(
    () => Number.parseInt(searchParams.get("page") ?? "1"),
    [searchParams]
  );

  const {
    data: problems,
    error,
    isLoading,
  } = useSWR(["/problems", page], () =>
    problemService.queryProblemByPage(page, 20)
  );

  return (
    <Card
      title={
        <Title as="h2" size="2xl">
          题目列表
        </Title>
      }
    >
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b">
            <th className="p-2 w-12 text-left">状态</th>
            <th className="p-2 text-left">题号</th>
            <th className="p-2 text-left">名称</th>
            <th className="p-2 text-right">难度</th>
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {!!error ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 bg-red-100 border-l-4 border-red-500"
                >
                  <Title as="h3" size="xl">
                    加载失败{error && `：${error}`}
                  </Title>
                </td>
              </tr>
            ) : !!problems ? (
              <>
                {problems.map((problem) => (
                  <tr key={`${problem.id}-${problem.title}`}>
                    <td></td>
                    <td>{problem.id}</td>
                    <td>
                      <Link href={`/main/problems/${problem.id}`}>
                        {problem.title}
                      </Link>
                    </td>
                    <td>{problem.difficulty}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center">
                  <ArchiveBoxXMarkIcon className="mx-auto mb-4 w-12 h-12" />
                  <p className="text-2xl">没有题目</p>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </Card>
  );
};
