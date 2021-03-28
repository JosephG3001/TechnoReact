import React, { FC } from "react";
import { Route, Switch } from "react-router";
import "./App.scss";
import callbackPage from "./components/callback-page";
import ErrorPage from "./components/error-page/error-page";
import My404Page from "./components/not-found/my-404-page";
import SilentRenewPage from "./components/silent-renew-page";
import CMSLayout from "./layouts/cms-layout";
import PublicLayout from "./layouts/public-layout";

const App: FC = () => {
  return (
    <Switch>
      <Route exact path="/callback" component={callbackPage} />
      <Route exact path="/silentrenew" component={SilentRenewPage} />

      <Route path="/article" exact={false} component={PublicLayout} />
      <Route path="/articles" exact={false} component={PublicLayout} />
      <Route path="/" exact component={PublicLayout} />

      <Route path="/cms" exact={false} component={CMSLayout} />

      <Route exact={false} path="/error" component={ErrorPage} />

      <Route exact={false} component={My404Page} />
    </Switch>
  );
};

export default App;
