/**
 * Enum representing the available routes in the application.
 */
export enum Routes {
  OneStepScreen = "getting-screen-one",
  Home = "Home",
  Login = "Login",
  Courses = "Courses",
  Ranks = "Ranks",
  Register = "Register",
  Profile = "Profile",
  EditProfile = "EditProfile",
  Settings = "Settings",
  Post = "Post",
  MissionDaily = "MissionDaily",
}

/**
 * Represents the parameter types for the root stack navigation.
 */
export type RootStackParams = {
  [Routes.Home]: undefined;
  [Routes.Login]: { email: string | undefined };
  [Routes.Register]: undefined;
  [Routes.OneStepScreen]: undefined;
  [Routes.Profile]: undefined;
  [Routes.EditProfile]: undefined;
  [Routes.MissionDaily]: undefined;
};

/**
 * Represents the parameter types for the profile stack routes.
 */
export type ProfileStackParams = {
  [Routes.Profile]: undefined;
  [Routes.EditProfile]: undefined;
};

/**
 * Represents the navigation parameters for the root stack.
 */
export type NavigationParams = RootStackParams;

export default Routes;
