import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ELoadingState from "../../enums/loading-state";
import {
  loadNews,
  selectNews,
  selectNewsState,
} from "../../redux/reducers/news.reducer";
import ErrorTriangle from "../error-triangle";
import LoadingSpinner from "../loading-spinner";

const StyledNews = styled.div`
  .news {
    .news-item {
      margin: 15px 0;
      padding: 15px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px,
        rgba(0, 0, 0, 0.12) 0px 0px 2px;
      background-color: ${({ theme }) => theme.pallet.newsRowBackgroundcolour};
      color: ${({ theme }) => theme.pallet.panelBackgroundColorAlt};

      .news-header {
        display: flex;
        justify-content: space-between;

        .news-date {
          color: ${({ theme }) => theme.pallet.themeColour2};
        }

        :last-child {
          margin-left: auto;
        }

        h3 {
          font-size: 1.2em;
          margin: 0;
          color: ${({ theme }) => theme.pallet.themeColour1};
        }
      }
    }
  }
`;

export const News: React.FC = () => {
  const news = useSelector(selectNews);
  const newsState = useSelector(selectNewsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNews());
  }, [dispatch]);

  return (
    <StyledNews>
      {newsState === ELoadingState.Failed && (
        <ErrorTriangle labelText="Failed to load news" />
      )}

      {newsState === ELoadingState.Loading && (
        <LoadingSpinner largeText={false} labelText="Loading news..." />
      )}

      {newsState === ELoadingState.Loaded && (
        <div className="news">
          {news.map((item) => (
            <div key={item.newsId} className="news-item">
              <div className="news-header">
                <h3>{item.title}</h3>
                <span className="news-date">
                  {new Date(item.createdDate).toDateString()}
                </span>
              </div>
              <div>{item.html}</div>
            </div>
          ))}
        </div>
      )}
    </StyledNews>
  );
};

export default News;
