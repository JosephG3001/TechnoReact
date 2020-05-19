import ArticleEntity from "../../classes/article-entity";

export const ARTICLES_IDLE = 'ARTICLES_IDLE';
export const LOADING_ARTICLES = 'LOADING_ARTICLES';
export const LOADED_ARTICLES = 'LOADED_ARTICLES';
export const LOAD_ARTICLES_FAIL = 'LOAD_ARTICLES_FAIL';

export type AllArticlesActions = typeof ARTICLES_IDLE |
                                 typeof LOADING_ARTICLES | 
                                 typeof LOADED_ARTICLES | 
                                 typeof LOAD_ARTICLES_FAIL;

export interface IIdleArticlesAction {
    type: typeof ARTICLES_IDLE;
}

export interface ILoadingArticlesAction {
    type: typeof LOADING_ARTICLES;
}

export interface ILoadedArticlesAction {
    type: typeof LOADED_ARTICLES;
    articleList: ArticleEntity[];
}

export interface ILoadArticlesFailedAction {
    type: typeof LOAD_ARTICLES_FAIL;    
}

export type Actions =                 
                IIdleArticlesAction |
                ILoadingArticlesAction |
                ILoadedArticlesAction |
                ILoadArticlesFailedAction