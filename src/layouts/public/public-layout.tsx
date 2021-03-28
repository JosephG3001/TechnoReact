import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Article from "../../components/article/article";
import Articles from "../../components/article/articles";
import Content from "../../components/cms/content";
import LandingPage from "../../components/landing-page/landing-page";
import LoginPage from "../../components/login-page";
import TopNav from "../../components/top-nav/top-nav";
import PublicSidebar from "./public-sidebar/public-sidebar";

export const PublicLayout: React.FC = () => {
  return (
    <>
      <TopNav />
      <PublicSidebar />
      <header className="App-header" />
      <div className="router-outlet">
        <Switch>
          <Route
            exact
            path="/articles/:parent/:child/article/:article?"
            component={Article}
          />
          <Route exact path="/articles/:parent/:child" component={Articles} />
          <Route exact path="/" component={LandingPage} />

          <Route exact component={Content} path="/cms/content" />
          <Redirect from="/cms" to="/cms/content" />

          <Route exact component={LoginPage} path="/login" />
        </Switch>
      </div>
      <ToastContainer />
    </>
  );
};

export default PublicLayout;
