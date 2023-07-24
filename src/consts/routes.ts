enum AppRouteName {
  Welcome = "Welcome",
  CreateAccount = "CreateAccount",
  CompleteProfile = "CompleteProfile",
  Tabs = "Tabs",
  ProductTabScreen = "ProductTabScreen",
  YouTabScreen = "YouTabScreen",
  UsTabScreen = "UsTabScreen",
  Login = "Login",
}
export const AppRoutes: Record<AppRouteName, string> = {
  Welcome: "/home",
  CreateAccount: "/create-account",
  Login: "/login",
  CompleteProfile: "/complete-profile",
  Tabs: "/tabs",
  ProductTabScreen: "products",
  YouTabScreen: "you",
  UsTabScreen: "us",
};
