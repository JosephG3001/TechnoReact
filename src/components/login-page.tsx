import React from "react";
import { useSelector } from "react-redux";
import { UserState } from "redux-oidc";
import { AppState } from "../redux/store";
import userManager from "../redux/userManager";
import LoadingPage from "./loading-page";

const LoginPage: React.FC = () => {
  const oidcState: UserState = useSelector<AppState, UserState>(
    (state: AppState) => state.oidcState
  );

  const login = () => {
    userManager.signinRedirect({
      data: {
        path: process.env.WEB_URL,
      },
    });
  };

  if (oidcState && !oidcState.isLoadingUser) {
    login();
  }

  return <LoadingPage labelText="Redirecting to login..." />;
};

export default LoginPage;
