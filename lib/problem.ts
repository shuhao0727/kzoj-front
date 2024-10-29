import { Axios } from "axios";
import Dayjs from "dayjs";

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

export class ProblemService {
  private axios: Axios;

  constructor(axios: Axios) {
    this.axios = axios;
  }

  createProblem = (problem: Problem): Promise<void> => {
    return this.axios.post<void>(`/problem/create`, problem).then();
  };

  deleteProblem = (id: number): Promise<void> => {
    return this.axios.delete<void>(`/problem/${id}`).then();
  };

  updateProblem = (problem: Problem): Promise<void> => {
    return this.axios.put<void>(`/problem/update`, problem).then();
  };

  queryProblemByPage = (
    pageIndex: number,
    pageSize?: number,
    isAscending?: boolean
  ) => {
    return this.axios
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

  queryProblemById = (id: number): Promise<Problem> => {
    return this.axios.get<Problem>(`/problem/get/${id}`).then((res) => ({
      ...res.data,
      utcCreated: Dayjs(res.data.utcCreated),
      utcLastModified: Dayjs(res.data.utcLastModified),
    }));
  };

  queryProblemByTitle = (title: string): Promise<Problem> => {
    return this.axios
      .get<Problem>(`/problem/queryByTitle/${title}`)
      .then((res) => ({
        ...res.data,
        utcCreated: Dayjs(res.data.utcCreated),
        utcLastModified: Dayjs(res.data.utcLastModified),
      }));
  };
}

export const useProblemService = (axios: Axios) => new ProblemService(axios);
