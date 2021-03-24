import { CircularProgress } from "@material-ui/core";
import { push } from "connected-react-router";
import { User } from "oidc-client";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import userManager, { updateAccessToken } from "../redux/userManager";

interface CallbackPageProps {
  signInParams: string;
}

const CallbackPage: React.FC<CallbackPageProps> = ({ signInParams }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    userManager
      .signinRedirectCallback(signInParams)
      .then((user: User) => {
        console.log(user);
        updateAccessToken();
        dispatch(push("/cms/content"));
      })
      .catch((error: any) => {
        // don't throw error for the generic oidc state error
        if (error.message !== "No state in response") {
          // dispatch({
          //     type: ErrorActions.ADD_ERROR,
          //     errorCode: 500,
          //     errorMessage: "Error occured in signinRedirectCallback: " + error
          // });
          dispatch(push("/error"));
        }
      });
  });

  return (
    <div className="loading-spinner-container">
      <CircularProgress className="mat-spinner" />
      <div>Signing in...</div>
    </div>
  );
};
export default connect()(CallbackPage);
