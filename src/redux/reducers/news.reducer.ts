import NewsEntity from './../../classes/news-entity';
import * as NewsActions from './../actions/news.actions';

export interface INewsState {
    currentAction: NewsActions.NEWS;
    errorMsg: string;
    news: NewsEntity[],
}

const InitialNewsState: INewsState = {
    currentAction: NewsActions.IDLE_NEWS_c,
    errorMsg: '',
    news: []
}

export function newsReducer(state: INewsState = InitialNewsState, action: NewsActions.Actions): INewsState {
    switch (action.type) {
        case (NewsActions.IDLE_NEWS_c): {
            return {
                ...state,
                currentAction: NewsActions.IDLE_NEWS_c,
            }
        }

        case (NewsActions.LOADED_NEWS_c): {
            return {
                ...state,
                currentAction: NewsActions.LOADED_NEWS_c,
                news: action.news
            }
        }        

        case (NewsActions.LOADING_NEWS_FAILED_c): {
            return {
                ...state,
                currentAction: NewsActions.LOADING_NEWS_FAILED_c,
                errorMsg: action.errorMsg
            }
        }

        case (NewsActions.LOADING_NEWS_c): {
            return {
                ...state,
                currentAction: NewsActions.LOADING_NEWS_c,
            }
        }

        case (NewsActions.LOAD_NEWS_REQUESTED_c): {
            return {
                ...state,
                currentAction: NewsActions.LOAD_NEWS_REQUESTED_c,
            }
        }

        default:
            return state;
    }
}