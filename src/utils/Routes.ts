/**
 * Enum representing the available routes in the application.
 */
export enum Routes {
  // Auth routes
  OneStepScreen = "getting-screen-one",
  Login = "Login",
  Register = "Register",

  // Main app routes
  Home = "Home",
  Settings = "Settings",
  MissionDaily = "MissionDaily",

  // Nested stacks
  BlogStack = "BlogStack",
  CourseStack = "CourseStack",
  RankStack = "RankStack",
  ProfileStack = "ProfileStack",

  // Blog sub-routes
  MyBlogs = "MyBlogs",
  BlogList = "BlogList",
  BlogDetail = "BlogDetail",
  CreateBlog = "CreateBlog",
  EditBlog = "EditBlog",

  // Course sub-routes
  CourseList = "CourseList",
  ChapterDetail = "ChapterDetail",
  CourseDetail = "CourseDetail",
  Exam = "Exam",
  HistoryExam = "HistoryExam",

  // Rank sub-routes
  RankList = "RankList",
  UserProfile = "UserProfile",

  // Profile sub-routes
  Profile = "Profile",
  EditProfile = "EditProfile",
}

/**
 * Root stack parameters
 */
export type RootStackParams = {
  [Routes.OneStepScreen]: undefined;
  [Routes.Login]: { email?: string };
  [Routes.Register]: undefined;
  [Routes.Home]: undefined;
  [Routes.MissionDaily]: undefined;
  [Routes.Settings]: undefined;

  // Nested stacks
  [Routes.BlogStack]: undefined;
  [Routes.CourseStack]: undefined;
  [Routes.RankStack]: undefined;
  [Routes.ProfileStack]: undefined;
};

/**
 * Blog stack parameters
 */
export type BlogStackParams = {
  [Routes.BlogStack]: undefined;
  [Routes.MyBlogs]: undefined;
  [Routes.BlogDetail]: { blogId: string | undefined };
  [Routes.BlogList]: undefined;
  [Routes.CreateBlog]: undefined;
  [Routes.EditBlog]: { blogId: string | undefined };
};

/**
 * Course stack parameters
 */
export type CourseStackParams = {
  [Routes.CourseStack]: undefined;
  [Routes.CourseList]: undefined;
  [Routes.CourseDetail]: { courseId: string };
  [Routes.ChapterDetail]: { chapterId: string };
  [Routes.Exam]: { examId: string };
};

/**
 * Rank stack parameters
 */
export type RankStackParams = {
  [Routes.RankStack]: undefined;
  [Routes.RankList]: undefined;
  [Routes.UserProfile]: { userId: string };
};

/**
 * Profile stack parameters
 */
export type ProfileStackParams = {
  [Routes.ProfileStack]: undefined;
  [Routes.Profile]: undefined;
  [Routes.EditProfile]: undefined;
  [Routes.HistoryExam]: undefined;
};

/**
 * Combined navigation parameters
 */
export type NavigationParams = RootStackParams &
  BlogStackParams &
  CourseStackParams &
  RankStackParams;

export default Routes;
