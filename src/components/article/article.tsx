/* eslint-disable react/no-danger */
import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ArticleEntity from "../../classes/article-entity";
import {
  EArticlesState,
  selectArticlesState,
} from "../../redux/reducers/articles.reducer";
import { selectSectionsState } from "../../redux/reducers/sections.reducer";
import {
  getArticleFromUrl,
  tryStoreCurrentTechAndSubsection,
} from "../../tools/url-helper";
import "./article.scss";

declare let SyntaxHighlighter: any;

const Article: React.FC = () => {
  const sectionsState = useSelector(selectSectionsState);
  const articlesState = useSelector(selectArticlesState);
  const [article, setArticle] = useState<ArticleEntity>();

  const params = useParams();

  const highlight = () => {
    let retries = 10;
    const tryHighlight = setTimeout(() => {
      SyntaxHighlighter.defaults.toolbar = false;
      SyntaxHighlighter.defaults.gutter = false;
      SyntaxHighlighter.all();
      SyntaxHighlighter.highlight({ gutter: false });
      // eslint-disable-next-line no-plusplus
      retries--;
      if (retries === 0) {
        clearTimeout(tryHighlight);
      }
    }, 100);
  };

  useEffect(() => {
    tryStoreCurrentTechAndSubsection();
    if (articlesState === EArticlesState.Loaded) {
      const articleFromUrl = getArticleFromUrl();
      if (articleFromUrl) {
        if (!article || article.articleId !== articleFromUrl.articleId) {
          setArticle(articleFromUrl);
          highlight();
        }
      }
    }
  }, [params, article, sectionsState, articlesState]);

  return (
    <>
      {articlesState === EArticlesState.Loaded && article && (
        <div className="article">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.articleHtml }}
          />
        </div>
      )}

      {articlesState === EArticlesState.Loading && (
        <div className="loading-spinner-container">
          <CircularProgress className="mat-spinner" />
          <div>Loading article...</div>
        </div>
      )}
    </>
  );
};

export default Article;
