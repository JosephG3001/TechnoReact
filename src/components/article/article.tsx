/* eslint-disable react/no-danger */
import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
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

declare let SyntaxHighlighter: any;

const StyledArticle = styled.div`
  .error,
  .loading-spinner-container {
    padding-top: 20px;
  }

  .article {
    max-width: 900px;
    margin: 0px auto;
    padding-top: 20px;

    .article-content {
      margin-left: 15px;
      margin-right: 15px;
      margin-bottom: 15px;
      padding: 15px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px,
        rgba(0, 0, 0, 0.12) 0px 0px 2px;
      color: ${({ theme }) => theme.pallet.foregroundColour1};
    }
  }
`;

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
    <StyledArticle>
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
    </StyledArticle>
  );
};

export default Article;
