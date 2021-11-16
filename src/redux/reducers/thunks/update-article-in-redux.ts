import ArticleEntity from "../../../classes/article-entity";
import Section from "../../../classes/section";
import { AppDispatch, AppState } from "../../store";
import { loadedSections } from "../sections.reducer";

const mapNewSections = (
  articleToUpdate: ArticleEntity,
  sections: Section[]
): Array<Section> => {
  return sections.map((sec) => {
    return {
      ...sec,
      inverseParentSection: mapNewSections(
        articleToUpdate,
        sec.inverseParentSection
      ),
      articleList: sec.articleList.map((article) => {
        return article.articleId === articleToUpdate.articleId
          ? articleToUpdate
          : article;
      }),
    };
  });
};

const updateArticleInRedux = (articleToUpdate: ArticleEntity) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const sections = getState().sections.menuItems;
  const newSections: Array<Section> = mapNewSections(articleToUpdate, sections);
  dispatch(loadedSections(newSections));
};

export default updateArticleInRedux;
