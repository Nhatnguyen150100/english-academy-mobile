import AuthService from "./authService";
import CourseService from "./courseService";
import ExamService from "./examService";
import MissionDailyService from "./missionDailyService";
import RankService from "./rankService";

export const authService = new AuthService();
export const rankService = new RankService();
export const missionDailyService = new MissionDailyService();
export const courseService = new CourseService();
export const examService = new ExamService();