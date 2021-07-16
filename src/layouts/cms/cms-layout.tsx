import { User } from "oidc-client";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import BackgroundImage from "../../components/backgroundImage";
import ContentExplorer from "../../components/cms/content-explorer";
import LoadingPage from "../../components/loading-page";
import TopNav from "../../components/top-nav/top-nav";
import { AppState } from "../../redux/store";
import userManager from "../../redux/userManager";
import CMSSidebar from "./cms-sidebar/cms-sidebar";

const CMSLayout: FC = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(
    (state: AppState) => state.oidcState.user && !state.oidcState.isLoadingUser
  );

  useEffect(() => {
    userManager.getUser().then((user: User | null) => {
      if (user === null) {
        console.log("Redirecting to login....");
        userManager.signinRedirect({
          state: {
            path: window.location.pathname,
          },
        });
      } else {
        userManager.signinSilent().catch((error: Error) => {
          if (
            error.message.indexOf("login_required") !== -1 ||
            error.message.indexOf("invalid_grant") !== -1
          ) {
            userManager.signinRedirect({
              state: {
                path: window.location.pathname,
              },
            });
          }
        });
      }
    });
  }, [dispatch, loggedIn]);

  return (
    <>
      {loggedIn ? (
        <div className="App">
          <BackgroundImage />
          <TopNav />
          <CMSSidebar />
          <header className="App-header" />
          <div className="root-content">
            <Switch>
              <Route exact path="/cms/content" component={ContentExplorer} />
              <Redirect from="/cms" to="/cms/content" />
            </Switch>
          </div>
        </div>
      ) : (
        <LoadingPage labelText="CMS Redirecting to login..." />
      )}
    </>
  );
};

export default CMSLayout;
