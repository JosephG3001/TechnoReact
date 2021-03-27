import { store as technoStore } from "..";
import { loadArticlesFromApi } from "../api/article-service";
import ArticleEntity from "../classes/article-entity";
import Section from "../classes/section";
import {
  loadedArticles,
  loadingArticles,
} from "../redux/reducers/articles.reducer";
import {
  setCurrentSubSection,
  setCurrentTech,
} from "../redux/reducers/sections.reducer";

function getTechFromURL(): Section | null {
  const params = window.location.href.split("/");
  const techName = decodeURIComponent(params[4]);
  const section = technoStore
    .getState()
    .sections.menuItems.find((s) => s.sectionName === techName);
  if (!section) {
    return null;
  }
  return section;
}

function getSubSectionFromURL(): Section | null {
  const parent = getTechFromURL();
  if (!parent) {
    return null;
  }
  const params = window.location.href.split("/");
  const subsectionName = decodeURIComponent(params[5]);
  const section = parent.inverseParentSection.find(
    (s) =>
      s.sectionName === subsectionName &&
      s.parentSectionName === parent.sectionName
  );
  if (!section) {
    return null;
  }
  return section;
}

export function getArticleFromUrl(): ArticleEntity | null {
  const params = window.location.href.split("/");
  const articleName = decodeURIComponent(params[7]);
  const article = technoStore
    .getState()
    .articles.articleList.find((s) => s.articleName === articleName);
  if (!article) {
    return null;
  }
  return article;
}

function getTechFromPath(path: string): Section | null {
  const params = path.split("/");
  const techName = decodeURIComponent(params[2]);
  const section = technoStore
    .getState()
    .sections.menuItems.find((s) => s.sectionName === techName);
  if (!section) {
    return null;
  }
  return section;
}

export function getSubSectionFromPath(path: string): Section | null {
  const parent = getTechFromPath(path);
  if (!parent) {
    return null;
  }
  const params = path.split("/");
  const subsectionName = decodeURIComponent(params[3]);
  const section = parent.inverseParentSection.find(
    (s) =>
      s.sectionName === subsectionName &&
      s.parentSectionName === parent.sectionName
  );
  if (!section) {
    return null;
  }
  return section;
}

export function tryStoreCurrentTechAndSubsection() {
  const tech = getTechFromURL();
  const subSection = getSubSectionFromURL();
  let techChanged = false;
  let subSectionChanged = false;

  if (tech && subSection) {
    const { currentTech } = technoStore.getState().sections;
    if (!currentTech || currentTech.sectionId !== tech.sectionId) {
      technoStore.dispatch(setCurrentTech(tech));
      techChanged = true;
    }

    const { currentSubSection } = technoStore.getState().sections;
    if (
      !currentSubSection ||
      currentSubSection.sectionId !== subSection.sectionId
    ) {
      technoStore.dispatch(setCurrentSubSection(subSection));
      subSectionChanged = true;
    }

    if (techChanged || subSectionChanged) {
      technoStore.dispatch(loadingArticles);
      loadArticlesFromApi(subSection.sectionId).then(
        (result: ArticleEntity[]) => {
          technoStore.dispatch(loadedArticles(result));
        }
      );
    }
  }
}
