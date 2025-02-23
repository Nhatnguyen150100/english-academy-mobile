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
  Profile = "Profile",
  EditProfile = "EditProfile",
  Settings = "Settings",
  MissionDaily = "MissionDaily",

  // Nested stacks
  BlogStack = "BlogStack",
  CourseStack = "CourseStack",
  RankStack = "RankStack",

  // Blog sub-routes
  BlogList = "BlogList",
  BlogDetail = "BlogDetail",
  CreateBlog = "CreateBlog",

  // Course sub-routes
  CourseList = "CourseList",
  CourseDetail = "CourseDetail",
  Exam = "Exam",
  HistoryExam = "HistoryExam",

  // Rank sub-routes
  RankList = "RankList",
  UserProfile = "UserProfile"
}

/**
 * Root stack parameters
 */
export type RootStackParams = {
  [Routes.OneStepScreen]: undefined;
  [Routes.Login]: { email?: string };
  [Routes.Register]: undefined;
  [Routes.Home]: undefined;
  [Routes.Profile]: undefined;
  [Routes.EditProfile]: undefined;
  [Routes.MissionDaily]: undefined;
  [Routes.Settings]: undefined;
  
  // Nested stacks
  [Routes.BlogStack]: undefined;
  [Routes.CourseStack]: undefined;
  [Routes.RankStack]: undefined;
};

/**
 * Blog stack parameters
 */
export type BlogStackParams = {
  [Routes.BlogList]: undefined;
  [Routes.BlogDetail]: { blogId: string };
  [Routes.CreateBlog]: undefined;
};

/**
 * Course stack parameters
 */
export type CourseStackParams = {
  [Routes.CourseList]: undefined;
  [Routes.CourseDetail]: { courseId: string };
  [Routes.Exam]: { examId: string };
  [Routes.HistoryExam]: undefined;
};

/**
 * Rank stack parameters
 */
export type RankStackParams = {
  [Routes.RankList]: undefined;
  [Routes.UserProfile]: { userId: string };
};

/**
 * Combined navigation parameters
 */
export type NavigationParams = RootStackParams &
  BlogStackParams &
  CourseStackParams &
  RankStackParams;

export default Routes;