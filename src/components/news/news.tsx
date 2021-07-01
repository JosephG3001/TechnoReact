import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ENewsState,
  loadNews,
  selectNews,
  selectNewsState,
} from "../../redux/reducers/news.reducer";
import ErrorTriangle from "../error-triangle";
import LoadingSpinner from "../loading-spinner";

const StyledNews = styled.div`
  .news {
    padding-left: 15px;
    padding-right: 15px;

    .news-item {
      max-width: 900px;
      margin: 15px auto;
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
      {newsState === ENewsState.Failed && (
        <ErrorTriangle labelText="Failed to load news" />
      )}

      {newsState === ENewsState.Loading && (
        <LoadingSpinner largeText={false} labelText="Loading news..." />
      )}

      {newsState === ENewsState.Loaded && (
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
