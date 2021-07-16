import ArticleEntity from "../../../classes/article-entity";
import Section from "../../../classes/section";
import { AppDispatch, AppState } from "../../store";
import { loadedSections } from "../sections.reducer";

const mapNewSections = (
  articleToAdd: ArticleEntity,
  sections: Section[]
): Array<Section> => {
  return sections.map((sec) => {
    if (articleToAdd.sectionId === sec.sectionId) {
      return {
        ...sec,
        inverseParentSection: mapNewSections(
          articleToAdd,
          sec.inverseParentSection
        ),
        articleList: [...sec.articleList, articleToAdd],
      };
    }
    return {
      ...sec,
      inverseParentSection: mapNewSections(
        articleToAdd,
        sec.inverseParentSection
      ),
    };
  });
};

const addArticleToRedux = (articleToAdd: ArticleEntity) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const sections = getState().sections.menuItems;
  const newSections: Array<Section> = mapNewSections(articleToAdd, sections);
  dispatch(loadedSections(newSections));
};

export default addArticleToRedux;
