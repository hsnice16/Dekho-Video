import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "context";
import { ROUTE_ROOT } from "utils";

export const ProtectRoute = () => {
  const { userState } = useUser();

  return userState.isUserAuthTokenExist ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE_ROOT} replace={true} />
  );
};
