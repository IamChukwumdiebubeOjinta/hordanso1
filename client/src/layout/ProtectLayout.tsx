import React, { ReactNode, useEffect } from "react";
import { Navigate, Outlet, To } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { RouteProps } from "react-router-dom";
import { auth } from "../vendors/firebase-config";

const ProtectLayout = ({ path = "/login" }: RouteProps) => {
  const [user] = useAuthState(auth);
    console.log(user?.email)
  if (user?.email == '') (<Navigate to={path as To} replace />);
  return <>{<Outlet />}</>;
};

export default ProtectLayout;
