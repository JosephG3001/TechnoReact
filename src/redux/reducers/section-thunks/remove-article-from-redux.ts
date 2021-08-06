import Section from "../../../classes/section";
import { AppDispatch, AppState } from "../../store";
import { loadedSections } from "../sections.reducer";

const mapNewSectionsDeleteArticle = (
  articleId: string,
  sections: Section[]
) => {
  return sections.map((sec) => {
    return {
      ...sec,
      inverseParentSection: mapNewSectionsDeleteArticle(
        articleId,
        sec.inverseParentSection
      ),
      articleList: sec.articleList.filter(
        (article) => article.articleId !== articleId
      ),
    };
  });
};

export const removeArticleFromRedux = (articleId: string) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const sections = getState().sections.menuItems;
  dispatch(loadedSections(mapNewSectionsDeleteArticle(articleId, sections)));
};

export default removeArticleFromRedux;
