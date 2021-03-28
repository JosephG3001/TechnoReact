import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import Section from "../../../classes/section";
import {
  ESectionsState,
  selectSections,
  selectSectionsState,
} from "../../../redux/reducers/sections.reducer";
import SidebarItem from "./public-sidebar-item";

const PublicSidebarItems: React.FC = () => {
  const sectionsState = useSelector(selectSectionsState);
  const sections = useSelector(selectSections, shallowEqual);

  return (
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
  );
};

export default PublicSidebarItems;
