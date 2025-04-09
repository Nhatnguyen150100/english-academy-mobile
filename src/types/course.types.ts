import { IChapterInfo } from "./chapter.types";

export interface ICourse {
  _id: string;
  name: string;
  description: string;
  chapters: IChapterInfo[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}
