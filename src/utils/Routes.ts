/**
 * Enum representing the available routes in the application.
 */
export enum Routes {
  OneStepScreen = "getting-screen-one",
  Home = "Home",
  Login = "Login",
  Register = "Register",
  Profile = "Profile",
  Settings = "Settings",
  Post = "Post",
}

/**
 * Represents the parameter types for the root stack navigation.
 */
export type RootStackParams = {
  [Routes.Home]: undefined;
  [Routes.Login]: { email: string | undefined };
  [Routes.Register]: undefined;
  [Routes.OneStepScreen]: undefined;
};

/**
 * Represents the parameter types for the profile stack routes.
 */
export type ProfileStackParams = {
  [Routes.Profile]: undefined;
  [Routes.Settings]: undefined;
  [Routes.Post]: { id: string; username: string };
};

/**
 * Represents the navigation parameters for the root stack.
 */
export type NavigationParams = RootStackParams;

export default Routes;
