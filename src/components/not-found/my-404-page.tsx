import React from "react";
import "./not-found.scss";

const My404Page: React.FC = () => {
  return (
    <div className="center">
      <i className="fas fa-frown" />
      <h1>404 Not found</h1>
      <p>The page you are looking for does not exist</p>
    </div>
  );
};

export default My404Page;
