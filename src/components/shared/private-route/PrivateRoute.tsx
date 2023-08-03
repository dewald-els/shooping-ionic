import { AppRoutes } from "../../../consts/routes";
import { useAuth } from "../../../context/AuthContext";
import { Redirect } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) {
    return <Redirect to={AppRoutes.Welcome} />;
  }
  return children;
};

export default PrivateRoute;
