import { IExamInfo } from "./exam.types";

export interface ICourse {
  _id: string;
  name: string;
  description: string;
  exams: IExamInfo[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}