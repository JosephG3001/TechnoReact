import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RecentArticle from "../../classes/recent-article";
import ELoadingState from "../../enums/loading-state";
import {
  loadLatestArticles,
  selectLatestArticles,
  selectLatestArticlesState,
} from "../../redux/reducers/latest-articles.reducer";
import { selectSections } from "../../redux/reducers/sections.reducer";
import ErrorTriangle from "../error-triangle";
import LoadingSpinner from "../loading-spinner";

const StyledLatestArticles = styled.div`
  .articles-row {
    min-width: 100%;
    margin: 15px auto;
    display: block;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px, rgba(0, 0, 0, 0.12) 0px 0px 2px;
    color: ${({ theme }) => theme.pallet.foregroundColour1};
    background-color: ${({ theme }) => theme.pallet.articleRowBackgroundcolour};
    transition: background-color 0.1s linear;
    text-decoration: none;
    align-items: center;

    .article-text-with-icon {
      display: flex;
      align-items: center;
    }

    h3 {
      margin: 0;
      font-size: 1em;
    }

    .material-icons {
      color: ${({ theme }) => theme.pallet.themeColour1};
    }

    .article-date {
      color: ${({ theme }) => theme.pallet.themeColour1};
      margin: 0;
    }

    &:hover {
      background-color: ${({ theme }) =>
        theme.pallet.articleRowHoverBackgroundcolour};
      color: ${({ theme }) => theme.pallet.foregroundColour1};

      .material-icons {
        color: ${({ theme }) => theme.pallet.foregroundColour1};
      }

      .article-date {
        color: ${({ theme }) => theme.pallet.foregroundColour1};
      }
    }
  }
`;

const LatestArticles = () => {
  const sectionsFromState = useSelector(selectSections);
  const latestArticlesState = useSelector(selectLatestArticlesState);
  const latestArticles = useSelector(selectLatestArticles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sectionsFromState && sectionsFromState.length > 0) {
      dispatch(loadLatestArticles());
    }
  }, [dispatch, sectionsFromState]);

  const getArticleUrl = (recentArticle: RecentArticle) => {
    return `/articles/${encodeURIComponent(
      recentArticle.section.parentSectionName || ""
    )}/${encodeURIComponent(
      recentArticle.section.sectionName
    )}/article/${encodeURIComponent(recentArticle.article.articleName)}`;
  };

  return (
    <StyledLatestArticles>
      {latestArticlesState === ELoadingState.Failed && (
        <ErrorTriangle labelText="Failed to load latest articles" />
      )}

      {latestArticlesState === ELoadingState.Loading && (
        <LoadingSpinner
          largeText={false}
          labelText="Loading latest articles..."
        />
      )}

      {latestArticlesState === ELoadingState.Loaded &&
        sectionsFromState &&
        sectionsFromState.length > 0 && (
          <div>
            {latestArticles.map((recentArticle) => (
              <Link
                key={recentArticle.article.articleId}
                className="articles-row"
                to={{
                  pathname: getArticleUrl(recentArticle),
                }}
              >
                <div>
                  <label className="article-date">
                    {new Date(recentArticle.article.articleDate).toDateString()}
                  </label>
                </div>
                <div className="article-text-with-icon">
                  <div className="material-icons">insert_drive_file</div>
                  <h3>
                    {recentArticle.section.sectionName}{" "}
                    {recentArticle.article.articleName}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
    </StyledLatestArticles>
  );
};

export default LatestArticles;
