export type TLevel = "EASY" | "MEDIUM" | "HARD";

export interface IExamInfo {
  _id: string;
  chapterId: string;
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
  chapterId: string;
  name: string;
  description: string;
  timeExam: number;
  level: TLevel;
  questions: IQuestion[];
  __v: number;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
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

export interface IResponseAnswerExam {
  results: Array<IResult>;
  score: number;
}

export interface IResult {
  questionId: string;
  correctAnswer: string;
  userAnser: string;
}

export interface IHistory {
  _id: string;
  userId: string;
  examId: IExamId;
  score: number;
  completedDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IExamId {
  _id: string;
  name: string;
  description: string;
  level: string;
}
