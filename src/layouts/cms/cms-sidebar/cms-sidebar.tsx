import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withSidebar from "../../../hocs/withSidebar/withSidebasr";
import { loadSections } from "../../../redux/reducers/sections.reducer";
import {
  selectUser,
  selectUserInitials,
} from "../../../redux/reducers/user.reducer";
import "./cms-sidebar.scss";

const CMSSidebar: React.FC = () => {
  const dispatch = useDispatch();

  const userInitials = useSelector(selectUserInitials);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(loadSections());
  }, [dispatch]);

  return (
    <>
      {user && (
        <div className="sidebar-user">
          <div className="user-initials">{userInitials}</div>
          <div className="welcome-label">Welcome back</div>
          <div className="name-label">
            {user.profile.given_name}
            &nbsp;
            {user.profile.family_name}
          </div>
        </div>
      )}
    </>
  );
};

export default withSidebar(CMSSidebar);
