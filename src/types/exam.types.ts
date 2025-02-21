export type TLevel = "EASY" | "MEDIUM" | "HARD"

export interface IExamInfo {
  _id: string;
  courseId: string;
  name: string;
  description: string;
  timeExam: number;
  level: TLevel;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IExamDetail {
  _id: string;
  courseId: string;
  name: string;
  description: string;
  timeExam: number;
  level: TLevel;
  questions: IQuestion[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IQuestion {
  content: string;
  order: number;
  options: IOption[];
  _id: string;
}

export interface IOption {
  content: string;
  _id: string;
}