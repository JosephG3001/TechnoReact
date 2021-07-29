/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import { Link } from "react-router-dom";
import Section from "../../../classes/section";

export interface ISidebarItemProps {
  section: Section;
}

export const PublicSidebarItem: React.FC<ISidebarItemProps> = ({ section }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSubMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
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
    </>
  );
};

export default PublicSidebarItem;
