/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Section from "../../../classes/section";

const StyledPublicSidebarItem = styled.div`
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

      &.parent {
        background-color: ${({ theme }) =>
          theme.pallet.sidebarBackgroundColour2};
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
      background-color: ${({ theme }) => theme.pallet.themeColour1};

      .section-icon {
        color: ${({ theme }) => theme.pallet.foregroundColour1} !important;
      }

      .rotate-icon {
        color: ${({ theme }) => theme.pallet.foregroundColour1} !important;
      }
    }
  }

  .section-children {
    background-color: ${({ theme }) =>
      theme.pallet.sidebarButtonBackgroundColour};
  }
`;

export interface ISidebarItemProps {
  section: Section;
}

export const PublicSidebarItem: React.FC<ISidebarItemProps> = ({ section }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSubMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledPublicSidebarItem>
      <div role="button" className="section-parent" onClick={toggleSubMenu}>
        {section.inverseParentSection.length === 0 ? (
          <Link
            className="sidebar-link"
            to={{
              pathname: `/articles/${encodeURIComponent(
                section.parentSectionName!
              )}/${encodeURIComponent(section.sectionName)}`,
            }}
          >
            <i className="material-icons section-icon">data_usage</i>
            <span className="section-text">{section.sectionName}</span>
          </Link>
        ) : (
          <div className="sidebar-link parent">
            <span className="section-text">{section.sectionName}</span>
            <i
              className={`noselect material-icons rotate-icon rotate ${
                !collapsed ? "deg90" : ""
              }`}
            >
              keyboard_arrow_right
            </i>
          </div>
        )}
      </div>
      <AnimateHeight
        className="section-children"
        height={collapsed ? 0 : "auto"}
      >
        {section.inverseParentSection.map((s: Section) => (
          <PublicSidebarItem key={s.sectionId} section={s} />
        ))}
      </AnimateHeight>
    </StyledPublicSidebarItem>
  );
};

export default PublicSidebarItem;
