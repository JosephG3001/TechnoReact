import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Section from "../../../classes/section";
import ErrorTriangle from "../../../components/error-triangle";
import LoadingSpinner from "../../../components/loading-spinner";
import ELoadingState from "../../../enums/loading-state";
import {
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
        padding: 10px 15px;
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

        .section-icon {
          font-size: 16px;
          margin: 0 5px;
          color: ${({ theme }) => theme.pallet.themeColour2};
        }

        .rotate-icon {
          color: ${({ theme }) => theme.pallet.themeColour2} !important;
        }

        .rotate {
          transition: all 0.2s linear;
          position: absolute;
          right: 4px;

          &.deg90 {
            transform: rotate(90deg);
          }
        }

        &:hover {
          background-color: ${({ theme }) =>
            theme.pallet.sidebarButtonHoverBackgroundColour};

          .section-icon {
            color: ${({ theme }) => theme.pallet.foregroundColour1} !important;
          }

          .rotate-icon {
            color: ${({ theme }) => theme.pallet.foregroundColour1} !important;
          }
        }
      }
    }
  }

  .section-children {
    background-color: ${({ theme }) =>
      theme.pallet.sidebarButtonBackgroundColour};
  }
`;

const PublicSidebarItems: React.FC = () => {
  const sectionsState = useSelector(selectSectionsState);
  const sections = useSelector(selectSections, shallowEqual);

  const doesTechsChildrenHaveArticles = (section: Section) => {
    for (let i = 0; i < section.articleList.length; i++) {
      if (section.articleList[i].visible) {
        return true;
      }
    }

    for (let i = 0; i < section.inverseParentSection.length; i++) {
      if (doesTechsChildrenHaveArticles(section.inverseParentSection[i])) {
        return true;
      }
    }
    return false;
  };

  return (
    <StyledSidebarItems>
      <div className="sidebar-items">
        {sectionsState === ELoadingState.Loading && (
          <LoadingSpinner largeText={false} labelText="Loading menu..." />
        )}

        {sectionsState === ELoadingState.Failed && (
          <ErrorTriangle labelText="Failed to load menu" />
        )}

        {sectionsState === ELoadingState.Loaded && (
          <nav>
            {sections
              .filter((section: Section) =>
                doesTechsChildrenHaveArticles(section)
              )
              .map((section: Section) => (
                <SidebarItem key={section.sectionId} section={section} />
              ))}
          </nav>
        )}
      </div>
    </StyledSidebarItems>
  );
};

export default PublicSidebarItems;
