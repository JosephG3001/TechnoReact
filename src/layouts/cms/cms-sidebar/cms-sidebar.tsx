import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import withSidebar from "../../../hocs/withSidebar";
import {
  selectUser,
  selectUserInitials,
} from "../../../redux/reducers/user.reducer";

const StyledCMSSidebar = styled.div`
  .sidebar-user {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 27px;

    .user-initials {
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour};
      color: ${({ theme }) => theme.pallet.themeColour2};
      border-radius: 50px;
      width: 70px;
      height: 70px;
      line-height: 70px;
      margin: 0 auto;
      font-size: 2.5em;
    }

    .welcome-label {
      font-size: 0.8em;
    }

    .name-label {
      font-size: 0.8em;
    }
  }

  .sidebar-link {
    display: block;
    display: flex;
    padding: 12px 15px;
    width: 100%;
    font-size: 0.9em;
    background-color: ${({ theme }) =>
      theme.pallet.sidebarButtonBackgroundColour};

    .section-icon {
      font-size: 16px;
      margin: 0 5px;
      color: ${({ theme }) => theme.pallet.themeColour1};
    }
  }

  .sidebar-items {
    padding-bottom: 65px;
    overflow-x: hidden;

    .section-parent {
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: ${({ theme }) =>
        theme.pallet.sidebarButtonBackgroundColour};
    }
  }

  a,
  .sidebar-link {
    display: block;
    display: flex;
    align-items: center;
    padding: 12px 15px;
    width: 100%;
    font-size: 0.9em;
    transition: all 0.1s linear;

    &.parent {
      background-color: ${({ theme }) =>
        theme.pallet.sidebarButtonBackgroundColour};
    }

    &:hover {
      background-color: ${({ theme }) =>
        theme.pallet.sidebarButtonHoverBackgroundColour};

      .section-icon {
        color: ${({ theme }) => theme.pallet.foregroundColour1} !important;
      }
    }
  }
`;

const CMSSidebar: React.FC = () => {
  const userInitials = useSelector(selectUserInitials);
  const user = useSelector(selectUser);

  return (
    <StyledCMSSidebar>
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

      <Link
        className="sidebar-link"
        to={{
          pathname: `/cms/content`,
        }}
      >
        <i className="material-icons section-icon">article</i>
        <span className="section-text">Content</span>
      </Link>

      <Link className="sidebar-link" to={{ pathname: `/cms/news` }}>
        <i className="material-icons section-icon">list</i>
        <span className="section-text">News</span>
      </Link>
    </StyledCMSSidebar>
  );
};

export default withSidebar(CMSSidebar);
