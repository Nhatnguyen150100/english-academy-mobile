export interface IRank {
  _id: string;
  name?: string;
  email: string;
  score: number;
  accountType: string;
  rankNumber: number
}


export interface IMyRank {
  rank: number;
  score: number;
  accountType: string;
  completedExams: number;
  totalExams: number;
}