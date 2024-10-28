import Dayjs from "dayjs";
import { axios } from "./axios";

export type Problem = {
  id?: number;
  title: string;
  author: string;
  createdByUser: string;
  description: string;
  timeLimit: number;
  memoryLimit: number;
  stackLimit: number;
  inputDescription: string;
  outputDescription: string;
  examples: string;
  problemSource: string;
  difficulty: number | string;
  tip: string;
  status: string;
  score: number;
  utcCreated: Dayjs.Dayjs;
  utcLastModified: Dayjs.Dayjs;
};

export type SubmitRequest = {
  problemId: number;
  userId: string;
  lang: string;
  submittedCode: string;
};

export type JudgeStatus = "Queueing" | "Judging" | "Finished" | "NotFound";

export type SubmitReceipt = {
  judgeId: String;
  status: JudgeStatus;
  positionInQueue: number;
};

export type JudgeResult = {
  judgeId: string;
  status: JudgeStatus;
  accept?: boolean;
  evaluationPoint?: boolean[];
  judgeTime?: Dayjs.Dayjs;
};

export const createProblem = (problem: Problem): Promise<void> => {
  return axios.post<void>(`/problem/create`, problem).then();
};

export const deleteProblem = (id: number): Promise<void> => {
  return axios.delete<void>(`/problem/${id}`).then();
};

export const updateProblem = (problem: Problem): Promise<void> => {
  return axios.put<void>(`/problem/update`, problem).then();
};

export const queryProblemByPage = (
  pageIndex: number,
  pageSize?: number,
  isAscending?: boolean
) => {
  return axios
    .get<Problem[]>(`/problem/queryByPage`, {
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        isAscending: isAscending,
      },
    })
    .then((res) =>
      res.data.map((problem) => ({
        ...problem,
        utcCreated: Dayjs(problem.utcCreated),
        utcLastModified: Dayjs(problem.utcLastModified),
      }))
    );
};

export const queryProblemById = (id: number): Promise<Problem> => {
  return axios.get<Problem>(`/problem/get/${id}`).then((res) => ({
    ...res.data,
    utcCreated: Dayjs(res.data.utcCreated),
    utcLastModified: Dayjs(res.data.utcLastModified),
  }));
};

export const queryProblemByTitle = (title: string): Promise<Problem> => {
  return axios.get<Problem>(`/problem/queryByTitle/${title}`).then((res) => ({
    ...res.data,
    utcCreated: Dayjs(res.data.utcCreated),
    utcLastModified: Dayjs(res.data.utcLastModified),
  }));
};

export const submitProblem = (
  request: SubmitRequest
): Promise<SubmitReceipt> => {
  return axios
    .post<SubmitReceipt>(`/problem/submit`, request)
    .then((res) => res.data);
};

export const queryJudgeStatus = (judgeId: string): Promise<SubmitReceipt> => {
  return axios
    .get<SubmitReceipt>(`/problem/judgeStatus`, { data: judgeId })
    .then((res) => res.data);
};

export const queryJudgeResult = (judgeId: string): Promise<JudgeResult> => {
  return axios
    .get<JudgeResult>(`/problem/judgeResult`, { data: judgeId })
    .then((res) => ({
      ...res.data,
      judgeTime: !res.data.judgeTime ? undefined : Dayjs(res.data.judgeTime),
    }));
};
