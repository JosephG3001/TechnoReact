import React from "react";
import { Link } from "react-router-dom";
import "./withSidebar.scss";

const withSidebar = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => ({ ...props }) => (
  <div className="sidebar">
    <div className="sidebar-header">Technolibrary</div>
    <Component {...props} />;
    <div className="sidebar-footer">
      <div className="sidebar-footer-inner">
        <div className="sidebar-footer-title">Technolibrary</div>
        <Link to="/">HOME</Link> | <Link to="/cms">CMS</Link>
      </div>
    </div>
  </div>
);

export default withSidebar;
