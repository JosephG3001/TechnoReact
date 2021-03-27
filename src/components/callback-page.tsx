import { CircularProgress } from "@material-ui/core";
import { push } from "connected-react-router";
import { User } from "oidc-client";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import { setError } from "../redux/reducers/error.reducer";
import userManager from "../redux/userManager";

const CallbackPage: React.FC = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   debugger;
  //   userManager
  //     .signinRedirectCallback(signInParams)
  //     .then((user: User) => {
  //       debugger;
  //       console.log(user);
  //       updateAccessToken();
  //       dispatch(push("/cms/content"));
  //     })
  //     .catch((error: any) => {
  //       // don't throw error for the generic oidc state error
  //       if (error.message !== "No state in response") {
  //         // dispatch({
  //         //     type: ErrorActions.ADD_ERROR,
  //         //     errorCode: 500,
  //         //     errorMessage: "Error occured in signinRedirectCallback: " + error
  //         // });
  //         dispatch(push("/error"));
  //       }
  //     });
  // });
  debugger;
  const onSuccess = (user: User) => {
    debugger;
    const { path } = user.state || {};
    dispatch(push(path || "/cms/content"));
  };

  const onError = (error: any) => {
    // don't throw error for the generic oidc state error
    debugger;
    if (error.message !== "No state in response") {
      // dispatch({
      //   type: ErrorActions.ADD_ERROR,
      //   errorCode: 500,
      //   errorMessage: `Error occured in signinRedirectCallback: ${error}`,
      // });
      // alert('there was a probem');
      dispatch(setError(`Error occured in signinRedirectCallback: ${error}`));

      // technoHistory.push("/error");

      dispatch(push("/error"));
    }
  };

  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={onSuccess}
      errorCallback={onError}
    >
      <div className="loading-spinner-container">
        <CircularProgress className="mat-spinner" />
        <div>Signing in...</div>
      </div>
    </CallbackComponent>
  );
};
export default connect()(CallbackPage);
