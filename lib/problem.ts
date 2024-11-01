import { Axios } from "axios";
import Dayjs from "dayjs";

export type Difficulty = "1" | "2" | "3" | "4" | "5" | "6" | "7";

export const Difficulties: Record<
  Difficulty,
  { colorText: string; labelText: string; className: string }
> = {
  "1": { colorText: "红", labelText: "入门", className: "bg-red-600" },
  "2": { colorText: "橙", labelText: "普及-", className: "bg-orange-600" },
  "3": { colorText: "黄", labelText: "普及", className: "bg-yellow-600" },
  "4": {
    colorText: "绿",
    labelText: "普及+ / 提高-",
    className: "bg-green-600",
  },
  "5": { colorText: "蓝", labelText: "提高", className: "bg-blue-600" },
  "6": {
    colorText: "紫",
    labelText: "提高+ / 省选-",
    className: "bg-purple-600",
  },
  "7": { colorText: "黑", labelText: "省选 / NOI", className: "bg-purple-800" },
};

export type Example = {
  input: string;
  output: string;
};

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
  difficulty: Difficulty;
  tip: string;
  status: "PUBLIC" | "PRIVATE" | "CONTEST";
  score: number;
  utcCreated: Dayjs.Dayjs;
  utcLastModified: Dayjs.Dayjs;
};

export class ProblemService {
  private axios: Axios;

  constructor(axios: Axios) {
    this.axios = axios;
  }

  static encodeExamples(examples: Example[]): string {
    return examples
      .map(
        ({ input, output }) =>
          `<input>${input}</input><output>${output}</output>`
      )
      .join("");
  }

  static decodeExamples(examples: string): Example[] {
    try {
      return examples
        .split("</output>")
        .slice(0, -1)
        .map((s) => {
          const [s1, s2] = s.split("</input><output>");
          return { input: s1.substring(7), output: s2 };
        });
    } catch (e) {
      return [{ input: "DECODE_EXAMPLES_FAILED", output: String(e) }];
    }
  }

  createProblem = (
    problem: Omit<Problem, "id" | "utcCreated" | "utcLastModified">
  ): Promise<number> => {
    return this.axios
      .post<string>(`/problem/create`, problem)
      .then((res) => Number.parseInt(res.data));
  };

  deleteProblem = (id: number): Promise<void> => {
    return this.axios.delete<void>(`/problem/${id}`).then();
  };

  updateProblem = (
    problem: Omit<Problem, "utcCreated" | "utcLastModified">
  ): Promise<void> => {
    return this.axios.put<void>(`/problem/update`, problem).then();
  };

  queryProblemByPage = (
    pageIndex: number,
    pageSize?: number,
    isAscending?: boolean
  ) => {
    return this.axios
      .get<Problem[]>(`/problem/page`, {
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
    if (Number.isNaN(id)) {
      return Promise.reject("PROBLEM_ID_SHOULD_BE_INT");
    } else {
      return this.axios.get<Problem>(`/problem/${id}`).then((res) => ({
        ...res.data,
        utcCreated: Dayjs(res.data.utcCreated),
        utcLastModified: Dayjs(res.data.utcLastModified),
      }));
    }
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

  queryTotality = (): Promise<number> => {
    return this.axios.get<number>(`/problem/totality`).then((res) => res.data);
  };
}

export const useProblemService = (axios: Axios) => new ProblemService(axios);
