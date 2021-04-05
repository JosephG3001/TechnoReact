import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ESectionsState,
  loadSections,
  selectSections,
  selectSectionsState,
} from "../../redux/reducers/sections.reducer";
import ContentEditor from "./content-editor";
import SectionMenuItem from "./section-menuitem";

const StyledContentExplorer = styled.div`
  .content-container {
    color: ${({ theme }) => theme.pallet.foregroundColour1};
    display: flex;

    .content-menu {
      flex: 1;
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour1};
      margin: 15px;
      padding: 15px;
    }

    .content-editor {
      flex: 2;
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour1};
      margin: 15px;
      padding: 15px;
    }

    h1 {
      font-size: 18px;
      color: ${({ theme }) => theme.pallet.themeColour2};
    }
  }
`;

const ContentExplorer: React.FC = () => {
  const dispatch = useDispatch();

  const sectionsState = useSelector(selectSectionsState);
  const sections = useSelector(selectSections, shallowEqual);

  useEffect(() => {
    dispatch(loadSections());
  }, [dispatch]);

  return (
    <StyledContentExplorer>
      {sectionsState === ESectionsState.loading && (
        <div className="loading-spinner-container">
          <CircularProgress className="mat-spinner" />
          <div>Loading sections...</div>
        </div>
      )}

      {sectionsState === ESectionsState.Failed && (
        <div className="loading-spinner-container">
          <i className="fas fa-exclamation-triangle" />
          <div>Failed to load sections</div>
        </div>
      )}

      {sectionsState === ESectionsState.loaded && (
        <div className="content-container">
          <div className="content-menu">
            <h1>Content Explorer</h1>
            {sections.map((section) => (
              <SectionMenuItem section={section} key={section.sectionId} />
            ))}
          </div>
          <div className="content-editor">
            <h1>Content Editor</h1>
            <ContentEditor />
          </div>
        </div>
      )}
    </StyledContentExplorer>
  );
};

export default ContentExplorer;
