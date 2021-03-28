import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledWithSidebar = styled.div`
  .sidebar {
    display: block;
    position: fixed;
    width: ${({ theme }) => theme.metrics.sidebarWidth};
    min-height: 100%;
    max-height: 100%;
    background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour1};
    color: ${({ theme }) => theme.pallet.sidebarForegroundColour1};
    overflow-y: auto;
    overflow-x: hidden;

    .sidebar-header {
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour2};
      height: ${({ theme }) => theme.metrics.topNavHeight};
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
    }

    .sidebar-footer {
      overflow-x: hidden;
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour2};
      text-align: center;
      bottom: 0;
      position: fixed;
      width: ${({ theme }) => theme.metrics.sidebarWidth};
      color: ${({ theme }) => theme.pallet.sidebarForegroundColour2};

      a {
        color: ${({ theme }) => theme.pallet.sidebarForegroundColour2};
      }

      .sidebar-footer-inner {
        margin: 10px;

        .sidebar-footer-title {
          color: ${({ theme }) => theme.pallet.themeColour2};
        }
      }
    }
  }

  a {
    text-decoration: none !important;
    color: ${({ theme }) => theme.pallet.foregroundColour1};
  }
`;

const withSidebar = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => ({ ...props }) => (
  <StyledWithSidebar>
    <div className="sidebar">
      <div className="sidebar-header">Technolibrary</div>
      <Component {...props} />
      <div className="sidebar-footer">
        <div className="sidebar-footer-inner">
          <div className="sidebar-footer-title">Technolibrary</div>
          <Link to="/">HOME</Link> | <Link to="/cms">CMS</Link>
        </div>
      </div>
    </div>
  </StyledWithSidebar>
);

export default withSidebar;
