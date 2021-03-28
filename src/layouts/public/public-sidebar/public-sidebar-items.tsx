import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Section from "../../../classes/section";
import {
  ESectionsState,
  selectSections,
  selectSectionsState,
} from "../../../redux/reducers/sections.reducer";
import SidebarItem from "./public-sidebar-item";

const StyledSidebarItems = styled.div`
  .sidebar-items {
    padding-bottom: 65px;
    overflow-x: hidden;

    .loading-spinner-container {
      text-align: center;

      .mat-spinner,
      .fas {
        width: ${({ theme }) => theme.metrics.spinnerSize} !important;
        height: ${({ theme }) => theme.metrics.spinnerSize} !important;
        color: ${({ theme }) => theme.pallet.themeColour1} !important;
      }

      .fas {
        font-size: 5em;
      }
    }

    .section-parent {
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour3};

      a,
      .sidebar-link {
        display: block;
        display: flex;
        padding: 12px 15px;
        width: 100%;
        font-size: 0.9em;
        text-decoration: none;

        &.parent {
          background-color: ${({ theme }) =>
            theme.pallet.sidebarBackgroundColour2};
        }
      }

      &:hover {
        background-color: ${({ theme }) => theme.pallet.themeColour1};

        .section-icon {
          color: ${({ theme }) => theme.pallet.foregroundColour1} !important;
        }
      }
    }
  }
`;

const PublicSidebarItems: React.FC = () => {
  const sectionsState = useSelector(selectSectionsState);
  const sections = useSelector(selectSections, shallowEqual);

  return (
    <StyledSidebarItems>
      <div className="sidebar-items">
        {sectionsState === ESectionsState.loading && (
          <div className="loading-spinner-container">
            <CircularProgress className="mat-spinner" />
            <div>Loading menu...</div>
          </div>
        )}

        {sectionsState === ESectionsState.Failed && (
          <div className="loading-spinner-container">
            <i className="fas fa-exclamation-triangle" />
            <div>Failed to load menu</div>
          </div>
        )}

        {sectionsState === ESectionsState.loaded && (
          <nav>
            {sections.map((section: Section) => (
              <SidebarItem key={section.sectionId} section={section} />
            ))}
          </nav>
        )}
      </div>
    </StyledSidebarItems>
  );
};

export default PublicSidebarItems;
