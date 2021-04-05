import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ENewsState,
  loadNews,
  selectNews,
  selectNewsState,
} from "../../redux/reducers/news.reducer";

const StyledNews = styled.div`
  .loading-spinner-container {
    text-align: center;
    color: ${({ theme }) => theme.pallet.foregroundColour1};

    .mat-spinner {
      width: ${({ theme }) => theme.metrics.spinnerSize} !important;
      height: ${({ theme }) => theme.metrics.spinnerSize} !important;
      color: ${({ theme }) => theme.pallet.themeColour1} !important;
    }
  }

  .error-container {
    text-align: center;
    color: ${({ theme }) => theme.pallet.foregroundColour1};

    .fas {
      font-size: 5em;
      color: ${({ theme }) => theme.pallet.themeColour2};
      margin: 15px;
    }
  }

  .news {
    padding-left: 15px;
    padding-right: 15px;

    .news-item {
      max-width: 900px;
      margin: 15px auto;
      padding: 15px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px,
        rgba(0, 0, 0, 0.12) 0px 0px 2px;
      background-color: ${({ theme }) => theme.pallet.bodyBackground1};
      color: ${({ theme }) => theme.pallet.panelBackgroundColorAlt};

      .news-header {
        display: flex;
        justify-content: space-between;

        :last-child {
          margin-left: auto;
        }

        h3 {
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
        <div className="error-container">
          <i className="fas fa-exclamation-triangle" />
          <div>Failed to load news</div>
        </div>
      )}

      {newsState === ENewsState.Loading && (
        <div className="loading-spinner-container">
          <CircularProgress className="mat-spinner" />
          <div>Loading news...</div>
        </div>
      )}

      {newsState === ENewsState.Loaded && (
        <div className="news">
          {news.map((item) => (
            <div key={item.newsId} className="news-item">
              <div className="news-header">
                <h3>{item.title}</h3>
                <span>{new Date(item.createdDate).toDateString()}</span>
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
