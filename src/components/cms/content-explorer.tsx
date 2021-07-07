import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Section from "../../classes/section";
import { selectArticleForEdit } from "../../redux/reducers/article.reducer";
import {
  ESectionsState,
  loadSections,
  selectSections,
  selectSectionsState,
} from "../../redux/reducers/sections.reducer";
import ErrorTriangle from "../error-triangle";
import LoadingSpinner from "../loading-spinner";
import ContentEditor from "./content-editor";
import SectionMenuItem from "./section-menuitem";

const StyledContentExplorer = styled.div`
  .content-container {
    color: ${({ theme }) => theme.pallet.foregroundColour1};
    display: flex;
    height: 100%;
    min-height: calc(100vh - ${({ theme }) => theme.metrics.topNavHeight});
    max-height: calc(100vh - ${({ theme }) => theme.metrics.topNavHeight});

    .content-menu {
      flex: 1;
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour};
      margin: 15px;
      display: flex;
      flex-direction: column;

      .content-items-wrapper {
        overflow-y: auto;
        height: calc(100vh - 100px);
      }
    }

    .content-editor {
      flex: 2 1 auto;
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour};
      margin: 15px;
      padding: 15px;
      display: flex;
      flex-direction: column;
    }

    .content-explorer-header,
    .content-editor-header {
      font-size: 18px;
      color: ${({ theme }) => theme.pallet.themeColour2};
    }

    .content-explorer-header {
      font-size: 18px;
      color: ${({ theme }) => theme.pallet.themeColour2};
      margin: 25px 15px;
    }
  }
`;

const ContentExplorer: React.FC = () => {
  const dispatch = useDispatch();

  const sectionsState = useSelector(selectSectionsState);
  const sections = useSelector(selectSections, shallowEqual);
  const articleForEdit = useSelector(selectArticleForEdit);

  const rootSection: Section = {
    displayOrder: 0,
    articleList: [],
    icon: "fa-home",
    sectionId: "Root",
    sectionName: "Root",
    inverseParentSection: sections,
    parentSectionId: "0",
    parentSectionName: "",
    visible: true,
  };

  useEffect(() => {
    dispatch(loadSections());
  }, [dispatch]);

  return (
    <StyledContentExplorer>
      <div className="content-container">
        <div className="content-menu">
          <h1 className="content-explorer-header">Content Explorer</h1>
          <div className="content-items-wrapper">
            {sectionsState === ESectionsState.loading && (
              <LoadingSpinner
                labelText="Loading sections..."
                largeText={false}
              />
            )}

            {sectionsState === ESectionsState.loaded && (
              <SectionMenuItem
                section={rootSection}
                key={rootSection.sectionId}
              />
            )}

            {sectionsState === ESectionsState.Failed && (
              <ErrorTriangle labelText="Failed to load sections" />
            )}
          </div>
        </div>
        <div className="content-editor">
          <h1 className="content-editor-header">Content Editor</h1>
          {!articleForEdit ? (
            <div>No Article</div>
          ) : (
            <ContentEditor articleForEdit={articleForEdit} />
          )}
        </div>
      </div>
    </StyledContentExplorer>
  );
};

export default ContentExplorer;
