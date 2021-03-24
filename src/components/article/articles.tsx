import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
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
import "./articles.scss";

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
    <div>
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
    </div>
  );
};

export default Articles;
