/* eslint-disable react/no-danger */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { loadArticleFromApi } from "../../api/article-service";
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
import LoadingSpinner from "../loading-spinner";

declare let SyntaxHighlighter: any;
declare let Prism: any;

const StyledArticle = styled.div`
  .error {
    padding-top: 20px;
  }

  .article {
    margin: auto;
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 15px;

    .article-content {
      margin: auto;
      max-width: 900px;
      background-color: ${({ theme }) => theme.pallet.articleBackgroundColour};
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
  const [localArticle, setLocalArticle] = useState<ArticleEntity>();
  const [loading, setLoading] = useState(true);

  const params = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const highlight = () => {
    let retries = 10;
    const tryHighlight = setTimeout(() => {
      SyntaxHighlighter.defaults.toolbar = false;
      SyntaxHighlighter.defaults.gutter = false;
      SyntaxHighlighter.all();
      SyntaxHighlighter.highlight({ gutter: false });
      // eslint-disable-next-line no-plusplus
      Prism.highlightAll();
      retries -= 1;
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
        if (
          !localArticle ||
          localArticle.articleId !== articleFromUrl.articleId
        ) {
          setLoading(true);
          loadArticleFromApi(articleFromUrl.articleId).then((article) => {
            setLocalArticle(article);
            highlight();
            setLoading(false);
          });
        }
      }
    }
  }, [params, localArticle, sectionsState, articlesState]);

  return (
    <StyledArticle>
      {articlesState === EArticlesState.Loaded && localArticle && (
        <div className="article">
          <div className="article-content">
            <div
              dangerouslySetInnerHTML={{ __html: localArticle.articleHtml }}
            />
          </div>
        </div>
      )}

      {(articlesState === EArticlesState.Loading || loading) && (
        <LoadingSpinner largeText={false} labelText="Loading Article..." />
      )}
    </StyledArticle>
  );
};

export default Article;
