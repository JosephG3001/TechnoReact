import NewsEntity from './../../classes/news-entity';
import * as NewsActions from './../actions/news.actions';

export interface INewsState {
    currentAction: NewsActions.AllNewsActions;
    news: NewsEntity[],
}

const InitialNewsState: INewsState = {
    currentAction: NewsActions.NEWS_IDLE,
    news: []
}

export function newsReducer(state: INewsState = InitialNewsState, action: NewsActions.Actions): INewsState {
    switch (action.type) {
        case (NewsActions.NEWS_IDLE): {
            return {
                ...state,
                currentAction: NewsActions.NEWS_IDLE,
            }
        }

        case (NewsActions.LOADED_NEWS): {
            return {
                ...state,
                currentAction: NewsActions.LOADED_NEWS,
                news: action.news
            }
        }        

        case (NewsActions.LOADING_NEWS_FAILED): {
            return {
                ...state,
                currentAction: NewsActions.LOADING_NEWS_FAILED,
            }
        }

        case (NewsActions.LOADING_NEWS): {
            return {
                ...state,
                currentAction: NewsActions.LOADING_NEWS,
            }
        }

        default:
            return state;
    }
}