import NewsEntity from './../../classes/news-entity';

export const NEWS_IDLE = "NEWS_IDLE";
export const LOADING_NEWS = "LOADING_NEWS";
export const LOADED_NEWS = "LOADED_NEWS";
export const LOADING_NEWS_FAILED = "LOADING_NEWS_FAILED";

export type AllNewsActions = typeof NEWS_IDLE |
                             typeof LOADING_NEWS |                
                             typeof LOADED_NEWS |
                             typeof LOADING_NEWS_FAILED;

export interface IResetIdleNewsAction {
    type: typeof NEWS_IDLE;
}

export interface ILoadingNewsAction {
    type: typeof LOADING_NEWS;
}

export interface ILoadedNewsAction {
    type: typeof LOADED_NEWS,
    news: NewsEntity[],    
}

export interface ILoadingNewsFailedAction {
    type: typeof LOADING_NEWS_FAILED;
}

export type Actions = 
                IResetIdleNewsAction |
                ILoadingNewsAction |
                ILoadedNewsAction |
                ILoadingNewsFailedAction;