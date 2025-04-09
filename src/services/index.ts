import AuthService from "./authService";
import BlogService from "./blogService";
import ChapterService from "./chapterService";
import CourseService from "./courseService";
import ExamService from "./examService";
import ImagesService from "./imageService";
import MissionDailyService from "./missionDailyService";
import RankService from "./rankService";

export const authService = new AuthService();
export const rankService = new RankService();
export const missionDailyService = new MissionDailyService();
export const courseService = new CourseService();
export const examService = new ExamService();
export const blogService = new BlogService();
export const imagesService = new ImagesService();
export const chapterService = new ChapterService();
