import { IExamInfo } from "./exam.types";

export interface IChapter {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  exams: IExamInfo[];
  order: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IChapterInfo {
  _id: string;
  title: string;
  description: string;
  order: number;
  exams: IExamInfo[];
}
