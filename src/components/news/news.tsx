import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ENewsState,
  loadNews,
  selectNews,
  selectNewsState,
} from "../../redux/reducers/news.reducer";
import { useAppDispatch } from "../../redux/store";
import "./news.scss";

export const News: React.FC = () => {
  const news = useSelector(selectNews);
  const newsState = useSelector(selectNewsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadNews());
  }, [dispatch]);

  return (
    <div>
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
    </div>
  );
};

export default News;
