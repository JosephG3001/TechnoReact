import ArticleEntity from "../../classes/article-entity";

export const IDLE_ARTICLE_c = 'IDLE_ARTICLE';
export const LOAD_ARTICLE_REQUESTED_c = 'LOAD_ARTICLE_REQUESTED';
export const LOADING_ARTICLE_c = 'LOADING_ARTICLE';
export const LOADED_ARTICLE_c = 'LOADED_ARTICLE';
export const LOADING_ARTICLE_FAIL_c = 'LOADING_ARTICLE_FAIL';

export type IDLE_ARTICLE = typeof IDLE_ARTICLE_c;
export type LOAD_ARTICLE_REQUESTED = typeof LOAD_ARTICLE_REQUESTED_c;
export type LOADING_ARTICLE = typeof LOADING_ARTICLE_c;
export type LOADED_ARTICLE = typeof LOADED_ARTICLE_c;
export type LOADING_ARTICLE_FAIL = typeof LOADING_ARTICLE_FAIL_c;
export type ARTICLE = 
                IDLE_ARTICLE |
                LOAD_ARTICLE_REQUESTED |
                LOADING_ARTICLE |
                LOADED_ARTICLE |
                LOADING_ARTICLE_FAIL;

export interface ILoadRequestedArticleAction {
    type: LOAD_ARTICLE_REQUESTED;
}

export interface IResetIdleArticleAction {
    type: IDLE_ARTICLE;
}

export interface ILoadingArticleAction {
    type: LOADING_ARTICLE;
}

export interface ILoadedArticleAction {
    type: LOADED_ARTICLE;
    article: ArticleEntity,
    section: string;
    tech: string;
    articleName: string;
}

export interface ILoadingArticleFailedAction {
    type: LOADING_ARTICLE_FAIL;
    errorMsg: string;
}

export type Actions = 
                ILoadRequestedArticleAction |
                IResetIdleArticleAction |                
                ILoadingArticleAction |
                ILoadedArticleAction |
                ILoadingArticleFailedAction