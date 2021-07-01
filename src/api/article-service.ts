import ArticleEntity from "../classes/article-entity";
import { Global } from "../techno.config";
import { showErrorToast } from "../tools/toast";

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

export const saveArticle = () => {};
