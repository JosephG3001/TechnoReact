import { User } from "oidc-client";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { CallbackComponent } from "redux-oidc";
import { setError } from "../redux/reducers/error.reducer";
import userManager from "../redux/userManager";
import LoadingSpinner from "./loading-spinner";

const CallbackPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
  const onSuccess = (user: User) => {
    const { path } = user.state || {};
    history.push(path || "/cms/content");
  };

  const onError = (error: any) => {
    // don't throw error for the generic oidc state error
    if (error.message !== "No state in response") {
      dispatch(setError(`Error occured in signinRedirectCallback: ${error}`));
      history.push("/error");
    }
  };

  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={onSuccess}
      errorCallback={onError}
    >
      <LoadingSpinner labelText="Signing in..." />
    </CallbackComponent>
  );
};
export default connect()(CallbackPage);
