import ArticleEntity from "../classes/article-entity";
import { Global } from "../techno.config";
import { showErrorToast } from "../tools/toast";
import {
  genericDelete,
  genericGetAuth,
  genericPost,
  genericPut,
} from "./apiUtils";

export const loadArticlesFromApi = (
  subSectionId: string
): Promise<ArticleEntity[]> => {
  return fetch(`${Global.contentUrl}/api/articles?sectionId=${subSectionId}`)
    .then((result) => result.json())
    .then((result: ArticleEntity[]) => {
      return result.filter((a) => a.visible);
    })
    .catch((error: string) => {
      showErrorToast(error);
      return [];
    });
};

export const loadLatestArticlesFromApi = (): Promise<ArticleEntity[]> => {
  return fetch(`${Global.contentUrl}/api/articles/latest`)
    .then((result) => result.json())
    .then((result: ArticleEntity[]) => {
      return result.filter((a) => a.visible);
    });
};

export const loadArticleFromApi = (
  articleId: string
): Promise<ArticleEntity> => {
  return genericGetAuth<ArticleEntity>(
    `${Global.contentUrl}/api/article?id=${articleId}`
  );
};

export const postArticle = (article: ArticleEntity) => {
  return genericPost<ArticleEntity, string>(
    `${Global.contentUrl}/api/article`,
    article
  );
};

export const putArticle = (article: ArticleEntity) => {
  return genericPut(`${Global.contentUrl}/api/article`, article);
};

export const deleteArticle = (articleId: string) => {
  return genericDelete(`${Global.contentUrl}/api/article?Id=${articleId}`);
};
