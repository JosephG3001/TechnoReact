import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "..";
import userManager from "../redux/userManager";

const withAuth = <P extends {}>(Component: ComponentType) => (props: P) => {
  const loadingUser = useSelector(
    (state: AppState) => state.oidcState.isLoadingUser
  );
  // const isSignedIn = useSelector(selectIsSignedIn);

  useEffect(() => {
    debugger;
    if (!loadingUser) {
      userManager.signinRedirect({
        state: {
          path: window.location.pathname,
        },
      });
    }
  }, [loadingUser]);

  return loadingUser ? <p>Loading session..</p> : <Component {...props} />;
};

export default withAuth;
