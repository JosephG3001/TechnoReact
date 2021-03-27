import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserState } from "redux-oidc";
import { AppState } from "../..";
import { loadSections } from "../../redux/reducers/sections.reducer";
import SidebarItems from "./sidebar-items";
import "./sidebar.scss";

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const [initials, setInitials] = useState<string>("");

  const oidcState: UserState = useSelector<AppState, UserState>(
    (state: AppState) => {
      if (state.oidcState && state.oidcState.user) {
        if (!initials) {
          let buildInitials = "";
          buildInitials += state.oidcState.user.profile.given_name
            ? state.oidcState.user.profile.given_name[0]
            : "";
          buildInitials += state.oidcState.user.profile.family_name
            ? state.oidcState.user.profile.family_name[0]
            : "";
          setInitials(buildInitials);
        }
      }
      return state.oidcState;
    }
  );

  useEffect(() => {
    dispatch(loadSections());
  }, [dispatch]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">Technolibrary</div>
      {oidcState.user && (
        <div className="sidebar-user">
          <div className="user-initials">{initials}</div>
          <div className="welcome-label">Welcome back</div>
          <div className="name-label">
            {oidcState && oidcState.user && oidcState.user.profile.given_name}
            &nbsp;
            {oidcState && oidcState.user && oidcState.user.profile.family_name}
          </div>
        </div>
      )}
      <SidebarItems />
      <div className="sidebar-footer">
        <div className="sidebar-footer-inner">
          <div className="sidebar-footer-title">Technolibrary</div>
          <Link to="/">HOME</Link> | <Link to="/cms">CMS</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
