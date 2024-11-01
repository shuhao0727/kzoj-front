"use client";

import { Alert } from "@/components/alert";
import { Card } from "@/components/card";
import { Paginate } from "@/components/paginate";
import { Difficulty } from "@/components/problem/difficulty";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { useProblemService } from "@/lib/problem";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import useSWR from "swr";

const pageName: string = "page";
const pageSize: number = 20;

export const ProblemsListTable: React.FC = () => {
  const axios = useAxios();
  const problemService = useProblemService(axios);
  const searchParams = useSearchParams();

  const page = useMemo(
    () => Number.parseInt(searchParams.get(pageName) ?? "1"),
    [searchParams]
  );

  const {
    data: problems,
    error,
    isLoading,
  } = useSWR(["/problems", page], () =>
    problemService.queryProblemByPage(page, pageSize)
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
            <th className="p-2 w-[3rem] text-center">状态</th>
            <th className="p-2 w-[5rem] text-center">题号</th>
            <th className="p-2 pl-4 text-left">名称</th>
            <th className="p-2 w-[5rem] text-center">难度</th>
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {!!error ? (
              <tr>
                <td colSpan={4}>
                  <Alert type="error" title="加载题目失败">
                    <p>{String(error)}</p>
                  </Alert>
                </td>
              </tr>
            ) : !!problems ? (
              <>
                {problems.map((problem) => (
                  <tr
                    key={`${problem.id}-${problem.title}`}
                    className={classNames(
                      "h-12 border-b border-gray-100",
                      "hover:bg-gray-100"
                    )}
                  >
                    <td className="p-2 text-center"></td>
                    <td className="p-2 text-center text-sm font-mono">
                      P{String(problem.id).padStart(4, "0")}
                    </td>
                    <td className="p-2 pl-4">
                      <Link href={`/problems/${problem.id}`}>
                        <button
                          className={classNames(
                            "w-full text-left text-blue-700",
                            "hover:text-blue-500 hover:underline focus:underline"
                          )}
                        >
                          {problem.title}
                        </button>
                      </Link>
                    </td>
                    <td className="p-2 text-center">
                      <Difficulty difficulty={problem.difficulty} />
                    </td>
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
      <Paginate
        pageName={pageName}
        pageSize={pageSize}
        className="mt-4 flex justify-center"
        totalKey="/problems/total"
        totalFetcher={() => problemService.queryTotality()}
      />
    </Card>
  );
};
