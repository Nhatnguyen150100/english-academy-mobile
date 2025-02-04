export interface IRank {
  _id: string;
  name: string;
  score: number;
  accountType: string;
}


export interface IMyRank {
  rank: number;
  score: number;
  accountType: string;
  completedExams: number;
  totalExams: number;
}