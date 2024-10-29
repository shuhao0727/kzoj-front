// import Dayjs from "dayjs";

// export type SubmitRequest = {
//   problemId: number;
//   userId: string;
//   lang: string;
//   submittedCode: string;
// };

// export type JudgeStatus = "Queueing" | "Judging" | "Finished" | "NotFound";

// export type SubmitReceipt = {
//   judgeId: String;
//   status: JudgeStatus;
//   positionInQueue: number;
// };

// export type JudgeResult = {
//   judgeId: string;
//   status: JudgeStatus;
//   accept?: boolean;
//   evaluationPoint?: boolean[];
//   judgeTime?: Dayjs.Dayjs;
// };

// export const submitProblem = (
//   request: SubmitRequest
// ): Promise<SubmitReceipt> => {
//   return axios
//     .post<SubmitReceipt>(`/problem/submit`, request)
//     .then((res) => res.data);
// };

// export const queryJudgeStatus = (judgeId: string): Promise<SubmitReceipt> => {
//   return axios
//     .get<SubmitReceipt>(`/problem/judgeStatus`, { data: judgeId })
//     .then((res) => res.data);
// };

// export const queryJudgeResult = (judgeId: string): Promise<JudgeResult> => {
//   return axios
//     .get<JudgeResult>(`/problem/judgeResult`, { data: judgeId })
//     .then((res) => ({
//       ...res.data,
//       judgeTime: !res.data.judgeTime ? undefined : Dayjs(res.data.judgeTime),
//     }));
// };
