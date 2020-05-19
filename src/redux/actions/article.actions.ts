import ArticleEntity from "../../classes/article-entity";

export const ARTICLE_IDLE = 'ARTICLE_IDLE';
export const LOADING_ARTICLE = 'LOADING_ARTICLE';
export const LOADED_ARTICLE = 'LOADED_ARTICLE';
export const LOADING_ARTICLE_FAIL = 'LOADING_ARTICLE_FAIL';

export type AllArticleActions = typeof ARTICLE_IDLE |
                                typeof LOADING_ARTICLE |
                                typeof LOADED_ARTICLE |
                                typeof LOADING_ARTICLE_FAIL;

export interface IIdleArticleAction {
    type: typeof ARTICLE_IDLE;
} 

export interface ILoadingArticleAction {
    type: typeof LOADING_ARTICLE;
}

export interface ILoadedArticleAction {
    type: typeof LOADED_ARTICLE;
    article: ArticleEntity,
    section: string;
    tech: string;
    articleName: string;
}

export interface ILoadingArticleFailedAction {
    type: typeof LOADING_ARTICLE_FAIL;
    errorMsg: string;
}

export type Actions =                 
                IIdleArticleAction |                
                ILoadingArticleAction |
                ILoadedArticleAction |
                ILoadingArticleFailedAction