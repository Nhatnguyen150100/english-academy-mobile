export interface IMissionDaily {
  _id: string;
  userId: string;
  loggedIn: boolean;
  completedExam: boolean;
  isConfirmed: boolean;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}