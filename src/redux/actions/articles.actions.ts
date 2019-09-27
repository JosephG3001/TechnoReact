import ArticleEntity from "../../classes/article-entity";

export const IDLE_ARTICLES_c = 'IDLE_ARTICLES';
export const LOAD_ARTICLES_REQUESTED_c = 'LOAD_ARTICLES_REQUESTED';
export const LOADING_ARTICLES_c = 'LOADING_ARTICLES';
export const LOADED_ARTICLES_c = 'LOADED_ARTICLES';
export const LOAD_ARTICLES_FAIL_c = 'LOAD_ARTICLES_FAIL';

export type IDLE_ARTICLES = typeof IDLE_ARTICLES_c;
export type LOAD_ARTICLES_REQUESTED = typeof LOAD_ARTICLES_REQUESTED_c;
export type LOADING_ARTICLES = typeof LOADING_ARTICLES_c;
export type LOADED_ARTICLES = typeof LOADED_ARTICLES_c;
export type LOAD_ARTICLES_FAIL = typeof LOAD_ARTICLES_FAIL_c;
export type ARTICLES = 
                IDLE_ARTICLES |
                LOAD_ARTICLES_REQUESTED |
                LOADING_ARTICLES | 
                LOADED_ARTICLES | 
                LOAD_ARTICLES_FAIL;

export interface ILoadRequestedArticlesAction {
    type: LOAD_ARTICLES_REQUESTED;
}

export interface IResetIdleArticleAction {
    type: IDLE_ARTICLES;
}

export interface ILoadingArticlesAction {
    type: LOADING_ARTICLES;
}

export interface ILoadedArticlesAction {
    type: LOADED_ARTICLES;
    articles: ArticleEntity[];
    section: string;
    tech: string;
}

export interface ILoadArticlesFailedAction {
    type: LOAD_ARTICLES_FAIL;
    errorMsg: string;  
}

export type Actions = 
                ILoadRequestedArticlesAction |
                IResetIdleArticleAction |
                ILoadingArticlesAction |
                ILoadedArticlesAction |
                ILoadArticlesFailedAction