import React from "react";
import News from "../news/news";
import "./landing-page.scss";

export const LandingPage: React.FC = () => {
  return (
    <div>
      <div className="header-wrapper">
        <h1>Technolibrary React Version</h1>
        <h2>Programming CMS</h2>
      </div>
      <News />
    </div>
  );
};

export default LandingPage;
