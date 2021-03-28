import React from "react";
import "./content.scss";

const Content: React.FC = () => {
  return (
    <div className="content-container">
      <div className="content-menu">Content Explorer</div>
      <div className="content-editor">Content Editor</div>
    </div>
  );
};

export default Content;
