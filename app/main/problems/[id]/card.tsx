"use client";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Difficulty } from "@/components/problem/difficulty";
import { Title } from "@/components/title";
import { useAxios } from "@/lib/axios";
import { config } from "@/lib/config";
import { ProblemService, useProblemService } from "@/lib/problem";
import {
  ArchiveBoxIcon,
  ArrowUpOnSquareIcon,
  ClockIcon,
  PencilIcon,
} from "@heroicons/react/16/solid";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import useSWR from "swr";

import MarkdownKatex from "@vscode/markdown-it-katex";
import MarkdownIt from "markdown-it";
import Link from "next/link";
const md = MarkdownIt();
md.use(MarkdownKatex);

export const MainProblemDetailCard = () => {
  const axios = useAxios();
  const problemService = useProblemService(axios);
  const params = useParams<{ id: string }>();

  const { data: problem, error } = useSWR(["/problems", params.id], () =>
    problemService.queryProblemById(Number.parseInt(params.id))
  );
  const pid = useMemo(
    () => (!problem ? undefined : `P${String(problem.id).padStart(4, "0")}`),
    [problem]
  );

  useEffect(() => {
    if (!!problem && !!pid) {
      document.title = `${pid} ${problem.title} | ${config.siteName}`;
    }
  }, [problem, pid]);

  const descHtml = useMemo(
    () => md.render(problem?.description ?? ""),
    [problem]
  );
  const inputHtml = useMemo(
    () => md.render(problem?.inputDescription ?? ""),
    [problem]
  );
  const outputHtml = useMemo(
    () => md.render(problem?.outputDescription ?? ""),
    [problem]
  );
  const tipHtml = useMemo(() => md.render(problem?.tip ?? ""), [problem]);
  const examples = useMemo(
    () => ProblemService.decodeExamples(problem?.examples ?? ""),
    [problem]
  );

  return (
    <Card
      title={
        <Title as="h2" size="3xl">
          {!problem ? (
            "题目详情"
          ) : (
            <>
              <div className="font-mono text-lg">{pid}</div>
              <div className="flex w-full">
                <span className="font-bold">{problem.title}</span>
                <span className="ml-auto inline-flex space-x-4">
                  <Link
                    href={`#`}
                    target="_blank"
                    className="inline-flex items-center text-base text-blue-600"
                  >
                    <ArchiveBoxIcon className="w-4 h-4 mr-1" />
                    提交列表
                  </Link>
                  <Link
                    href={`/admin/problems/${problem.id}`}
                    target="_blank"
                    className="inline-flex items-center text-base text-red-600"
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    编辑题目
                  </Link>
                </span>
              </div>
            </>
          )}
        </Title>
      }
    >
      {!!error && <Alert type="error">{error}</Alert>}
      {!!problem && (
        <div className="grid grid-cols-4 gap-4 px-4">
          <div className="col-span-3 space-y-8 py-4">
            <div id="problem-description">
              <Title as="h3" size="xl" bold="semibold" className="mb-2 -ml-4">
                【题目描述】
              </Title>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: descHtml }}
              />
            </div>
            <div id="problem-input-format">
              <Title as="h3" size="xl" bold="semibold" className="mb-2 -ml-4">
                【输入格式】
              </Title>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: inputHtml }}
              />
            </div>
            <div id="problem-output-format">
              <Title as="h3" size="xl" bold="semibold" className="mb-2 -ml-4">
                【输出格式】
              </Title>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: outputHtml }}
              />
            </div>
            <div id="problem-examples">
              <Title as="h3" size="xl" bold="semibold" className="mb-2 -ml-4">
                【样例数据】
              </Title>
              <div className="flex flex-col space-y-2">
                {examples.map(({ input, output }, index) => (
                  <div key={index}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Title as="h4" size="md" className="mb-2">
                          样例 #{index + 1} 输入
                        </Title>
                        <pre className="my-2 p-4 font-mono rounded-md bg-gray-100">
                          {input}
                        </pre>
                      </div>
                      <div>
                        <Title as="h4" size="md" className="mb-2">
                          样例 #{index + 1} 输出
                        </Title>
                        <pre className="my-2 p-4 font-mono rounded-md bg-gray-100">
                          {output}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {problem.tip && (
              <div id="problem-tip">
                <Title as="h3" size="xl" bold="semibold" className="mb-2 -ml-4">
                  【提示】
                </Title>
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{ __html: tipHtml }}
                />
              </div>
            )}
            {problem.problemSource && (
              <div id="problem-source">
                <Title as="h3" size="xl" bold="semibold" className="mb-2 -ml-4">
                  【来源】
                </Title>
                <div>{problem.problemSource}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col py-4 pl-4 space-y-4 rounded-md border-l">
            <div className="flex">
              <span className="font-bold">时间限制</span>
              <span className="ml-auto">
                {(problem.timeLimit / 1000).toFixed(1)} s
              </span>
            </div>
            <div className="flex">
              <span className="font-bold">空间限制</span>
              <span className="ml-auto">{problem.memoryLimit} MiB</span>
            </div>
            <div className="flex">
              <span className="font-bold">题目难度</span>
              <span className="ml-auto">
                <Difficulty difficulty={problem.difficulty} />
              </span>
            </div>
            <div className="flex">
              <span className="font-bold">提交数量</span>
              <span className="ml-auto">0 / 0</span>
            </div>
            <hr className="my-4" />
            <Button type="info" icon={ArrowUpOnSquareIcon}>
              提交答案
            </Button>
            <hr className="my-4" />
            <div className="flex">
              <span className="font-bold">我的得分</span>
              <span className="ml-auto">80</span>
            </div>
            <div className="space-y-2">
              <div className="font-bold mb-2">我的提交</div>
              <div className="flex ml-8">
                <span className="font-bold">#114154</span>
                <span className="ml-auto">80</span>
              </div>
              <div className="flex ml-8">
                <span className="font-bold">#114153</span>
                <span className="ml-auto">50</span>
              </div>
              <div className="flex ml-8">
                <span className="font-bold">#114152</span>
                <span className="ml-auto">0</span>
              </div>
              <div>
                <Button type="gray" icon={ClockIcon}>
                  提交记录
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
