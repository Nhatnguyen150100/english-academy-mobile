import DEFINE_SCORE from "@src/constants/score";
import { TLevel } from "@src/types/exam.types";

const getScoreFromExam = (level: TLevel) => {
  if(level === "EASY") return DEFINE_SCORE.EASY;
  if(level === "MEDIUM") return DEFINE_SCORE.MEDIUM;
  if(level === "HARD") return DEFINE_SCORE.HARD;
}

export default getScoreFromExam;