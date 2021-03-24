/* eslint-disable react-hooks/rules-of-hooks */
import { CircularProgress } from "@material-ui/core";
import { User } from "oidc-client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Content from "../components/cms/content";
import Sidebar from "../components/sidebar/sidebar";
import { AppState } from "../redux/store";
import userManager from "../redux/userManager";

const CMSLayout = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(
    (state: AppState) => state.oidcState.user && !state.oidcState.isLoadingUser
  );

  useEffect(() => {
    userManager.getUser().then((user: User | null) => {
      if (user === null) {
        console.log("Redirecting to login....");
        // dispatch(push("/login"));
      } else {
        userManager.signinSilent().catch((error: Error) => {
          if (error.message.indexOf("login_required") !== -1) {
            // dispatch(push("/login"));
          }
        });
      }
    });
  }, [dispatch]);

  return (
    <>
      {loggedIn ? (
        <div className="App">
          <Sidebar />
          <header className="App-header" />
          <div className="router-outlet">
            <Switch>
              <Route exact path="/cms/content" component={Content} />
            </Switch>
          </div>
        </div>
      ) : (
        <div className="loading-spinner-container">
          <CircularProgress className="mat-spinner" />
          <div>Redirecting...</div>
        </div>
      )}
    </>
  );
};

export default CMSLayout;
