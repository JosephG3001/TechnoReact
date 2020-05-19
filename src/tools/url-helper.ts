import ArticleEntity from "../classes/article-entity";
import Section from "../classes/section";
import * as ArticlesActions from '../redux/actions/articles.actions';
import * as SectionActions from '../redux/actions/sections.actions';
import { store } from "../redux/reducers/root.reducer";
import { loadArticlesFromApi } from "../api/article-service";

export function getTechFromURL(): Section | null {
    const params = window.location.href.split('/');
    const techName = decodeURIComponent(params[4]);
    const section = store.getState().sections.menuItems.find(s => s.sectionName === techName);
    if (!section){
        return null;
    }
    return section;    
}

export function getSubSectionFromURL(): Section | null {
    const parent = getTechFromURL();
    if (!parent) {
        return null;
    }
    const params = window.location.href.split('/');
    const subsectionName = decodeURIComponent(params[5]);
    const section = parent.inverseParentSection.find(s => s.sectionName === subsectionName && s.parentSectionName === parent.sectionName);
    if (!section) {
        return null;
    }
    return section;    
}

export function getArticleFromUrl(): ArticleEntity | null {
    const params = window.location.href.split('/');
    const articleName = decodeURIComponent(params[7]);    
    const article = store.getState().articles.articleList.find(s => s.articleName === articleName);
    if (!article) {
        return null;
    }
    return article;
}

export function getTechFromPath(path: string): Section | null {
    const params = path.split('/');
    const techName = decodeURIComponent(params[2]);
    const section = store.getState().sections.menuItems.find(s => s.sectionName === techName);
    if (!section){
        return null;
    }
    return section; 
}

export function getSubSectionFromPath(path: string): Section | null {
    const parent = getTechFromPath(path);
    if (!parent) {
        return null;
    }    
    const params = path.split('/');
    const subsectionName = decodeURIComponent(params[3]);
    const section = parent.inverseParentSection.find(s => s.sectionName === subsectionName && s.parentSectionName === parent.sectionName);
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

    if (tech && subSection)  {
        const currentTech = store.getState().sections.currentTech;
        if (!currentTech || currentTech.sectionId !== tech.sectionId) {
            store.dispatch({ type: SectionActions.SET_CURRENT_TECH, section: tech });
            techChanged = true;
        }

        const currentSubSection = store.getState().sections.currentSubSection;
        if (!currentSubSection || currentSubSection.sectionId !== subSection.sectionId) {
            store.dispatch({ type: SectionActions.SET_CURRENT_SUBSECTION, section: subSection });
            subSectionChanged = true;
        }

        if (techChanged || subSectionChanged) {
            store.dispatch({ type: ArticlesActions.LOADING_ARTICLES});
            loadArticlesFromApi(subSection.sectionId).then((result: ArticleEntity[]) => {
                store.dispatch({ type: ArticlesActions.LOADED_ARTICLES, articleList: result });
            });
        }            
    }
}