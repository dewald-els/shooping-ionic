enum AppRouteName {
  Welcome = "Welcome",
  CreateAccount = "CreateAccount",
  CompleteProfile = "CompleteProfile",
  Tabs = "Tabs",
  ProductTabScreen = "ProductTabScreen",
  YouTabScreen = "YouTabScreen",
  UsTabScreen = "UsTabScreen",
  Login = "Login",
  Start = "Start",
}
export const AppRoutes: Record<AppRouteName, string> = {
  Start: "/",
  Welcome: "/home",
  CreateAccount: "/create-account",
  Login: "/login",
  CompleteProfile: "/complete-profile",
  Tabs: "/tabs",
  ProductTabScreen: "products",
  YouTabScreen: "you",
  UsTabScreen: "us",
};
