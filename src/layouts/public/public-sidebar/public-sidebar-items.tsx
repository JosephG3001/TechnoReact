import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Section from "../../../classes/section";
import ErrorTriangle from "../../../components/error-triangle";
import LoadingSpinner from "../../../components/loading-spinner";
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

    .section-parent {
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: ${({ theme }) =>
        theme.pallet.sidebarButtonBackgroundColour};

      a,
      .sidebar-link {
        display: block;
        display: flex;
        padding: 12px 15px;
        width: 100%;
        font-size: 0.9em;
        text-decoration: none;
        transition: all 0.1s linear;

        &:hover {
          background-color: ${({ theme }) =>
            theme.pallet.sidebarButtonHoverBackgroundColour};

          .section-icon {
            color: ${({ theme }) => theme.pallet.foregroundColour1} !important;
          }
        }

        &.parent {
          background-color: ${({ theme }) =>
            theme.pallet.sidebarBackgroundColour2};

          &:hover {
            background-color: ${({ theme }) =>
              theme.pallet.sidebarButtonHoverBackgroundColour};

            .section-icon {
              color: ${({ theme }) =>
                theme.pallet.foregroundColour1} !important;
            }
          }
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
          <LoadingSpinner largeText={false} labelText="Loading menu..." />
        )}

        {sectionsState === ESectionsState.Failed && (
          <ErrorTriangle labelText="Failed to load menu" />
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
