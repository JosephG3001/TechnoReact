import NewsEntity from './../../classes/news-entity';

export const IDLE_NEWS_c = "IDLE_NEWS";
export const LOAD_NEWS_REQUESTED_c = "LOAD_NEWS_REQUESTED";
export const LOADING_NEWS_c = "LOADING_NEWS";
export const LOADED_NEWS_c = "LOADED_NEWS";
export const LOADING_NEWS_FAILED_c = "LOADING_NEWS_FAILED";

export type IDLE_NEWS = typeof IDLE_NEWS_c;
export type LOAD_NEWS_REQUESTED = typeof LOAD_NEWS_REQUESTED_c;
export type LOADING_NEWS = typeof LOADING_NEWS_c;
export type LOADED_NEWS = typeof LOADED_NEWS_c;
export type LOADING_NEWS_FAILED = typeof LOADING_NEWS_FAILED_c;
export type NEWS = 
                IDLE_NEWS |
                LOAD_NEWS_REQUESTED |
                LOADING_NEWS |
                LOADED_NEWS |
                LOADING_NEWS_FAILED;

export interface ILoadingRequestedNewsAction {
    type: LOAD_NEWS_REQUESTED;
}

export interface IResetIdleNewsAction {
    type: IDLE_NEWS;
}

export interface ILoadingNewsAction {
    type: LOADING_NEWS;
}

export interface ILoadedNewsAction {
    type: LOADED_NEWS,
    news: NewsEntity[],    
}

export interface ILoadingNewsFailedAction {
    type: LOADING_NEWS_FAILED;
    errorMsg: string
}

export type Actions = 
                ILoadingRequestedNewsAction |
                IResetIdleNewsAction |
                ILoadingNewsAction |
                ILoadedNewsAction |
                ILoadingNewsFailedAction;