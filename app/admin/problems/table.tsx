"use client";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Difficulty } from "@/components/problem/difficulty";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { useProblemService } from "@/lib/problem";
import {
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import classNames from "classnames";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import useSWR from "swr";

export const AdminProblemsListTable: React.FC = () => {
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
        <div className="flex">
          <Title as="h2" size="2xl">
            题目列表
          </Title>
          <Link
            href="/admin/problems/create"
            className="ml-auto inline-flex text-green-600"
          >
            <Button type="success" icon={PlusIcon}>
              添加题目
            </Button>
          </Link>
        </div>
      }
    >
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b">
            <th className="p-2 w-[5rem] text-center">题号</th>
            <th className="p-2 pl-4 text-center">名称</th>
            <th className="p-2 w-[5rem] text-center">难度</th>
            <th className="p-2 w-[8rem] text-center">作者</th>
            <th className="p-2 w-[8rem] text-center">提交</th>
            <th className="p-2 w-[14rem] text-center">操作</th>
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
                    <td className="p-2 text-center text-sm font-mono">
                      P{String(problem.id).padStart(4, "0")}
                    </td>
                    <td className="p-2 pl-4">
                      <Link href={`/main/problems/${problem.id}`}>
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
                    <td className="p-2 text-center">doowzs</td>
                    <td className="p-2 text-center">0 / 0</td>
                    <td className="p-2 text-center">
                      <span className="flex space-x-2">
                        <Link href={`/admin/problems/${problem.id}`}>
                          <Button
                            type="warning"
                            size="sm"
                            icon={ArchiveBoxIcon}
                            disabled
                          >
                            查看提交
                          </Button>
                        </Link>
                        <Link href={`/admin/problems/${problem.id}`}>
                          <Button type="info" size="sm" icon={PencilSquareIcon}>
                            编辑题目
                          </Button>
                        </Link>
                      </span>
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
    </Card>
  );
};
