import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  EArticlesState,
  selectArticles,
  selectArticlesState,
} from "../../redux/reducers/articles.reducer";
import {
  selectCurrentSubSection,
  selectCurrentTech,
  selectSectionsState,
} from "../../redux/reducers/sections.reducer";
import { tryStoreCurrentTechAndSubsection } from "../../tools/url-helper";

const StyledArticles = styled.div`
  .loading-spinner-container {
    padding-top: 20px;
    text-align: center;

    .mat-spinner {
      width: ${({ theme }) => theme.metrics.spinnerSize} !important;
      height: ${({ theme }) => theme.metrics.spinnerSize} !important;
    }
  }

  .articles {
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 15px;

    .articles-jumbotron {
      max-width: 900px;
      margin: 0 auto;
      padding: 15px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px,
        rgba(0, 0, 0, 0.12) 0px 0px 2px;
      background-color: ${({ theme }) => theme.pallet.bodyBackground1};
      color: ${({ theme }) => theme.pallet.foregroundColour1};

      h2 {
        color: ${({ theme }) => theme.pallet.themeColour2};
      }
    }

    .articles-row {
      display: flex;
      max-width: 900px;
      margin: 15px auto;
      padding: 15px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px,
        rgba(0, 0, 0, 0.12) 0px 0px 2px;
      color: ${({ theme }) => theme.pallet.foregroundColour1};
      background-color: ${({ theme }) => theme.pallet.bodyBackground1};
      transition: background-color 0.1s linear;
      text-decoration: none;

      * {
        flex: 1;
      }

      h3 {
        margin: 0;
      }

      &:hover {
        background-color: ${({ theme }) => theme.pallet.themeColour1};
        color: ${({ theme }) => theme.pallet.foregroundColour1};
      }
    }
  }
`;

const Articles: React.FC = () => {
  const articlesState = useSelector(selectArticlesState);
  const sectionsState = useSelector(selectSectionsState);
  const articles = useSelector(selectArticles);
  const currentTech = useSelector(selectCurrentTech);
  const currentSubSection = useSelector(selectCurrentSubSection);

  const params = useParams();

  useEffect(() => {
    tryStoreCurrentTechAndSubsection();
  }, [params, articlesState, sectionsState]);

  return (
    <StyledArticles>
      {currentTech && currentSubSection && (
        <div className="articles">
          <div className="articles-jumbotron">
            <h1>{currentTech.sectionName}</h1>
            <h2>{currentSubSection.sectionName}</h2>
          </div>

          {articlesState === EArticlesState.Loading && (
            <div className="loading-spinner-container">
              <CircularProgress className="mat-spinner" />
              <div>Loading articles...</div>
            </div>
          )}

          {articlesState === EArticlesState.Loaded &&
            articles &&
            articles.map((item) => (
              <Link
                key={item.articleId}
                className="articles-row"
                to={{
                  pathname: `/articles/${encodeURIComponent(
                    currentTech!.sectionName
                  )}/${encodeURIComponent(
                    currentSubSection!.sectionName
                  )}/article/${encodeURIComponent(item.articleName)}`,
                }}
              >
                <div className="material-icons">insert_drive_file</div>
                <h3>{item.articleName}</h3>
                <label>{new Date(item.articleDate).toDateString()}</label>
              </Link>
            ))}
        </div>
      )}
    </StyledArticles>
  );
};

export default Articles;
