import ArticleEntity from './../../classes/article-entity';
import * as ArticleActions from './../actions/article.actions';

export interface IArticleState {
    currentAction: ArticleActions.AllArticleActions;
    article: ArticleEntity | null;
}

const InitialArticleState: IArticleState = {
    currentAction: ArticleActions.ARTICLE_IDLE,
    article: null,
}

export function articleReducer(state: IArticleState = InitialArticleState, action: ArticleActions.Actions): IArticleState {
    switch (action.type) {
        case (ArticleActions.ARTICLE_IDLE): {
            return {
                ...state,
                currentAction: ArticleActions.ARTICLE_IDLE,
            }
        }

        case (ArticleActions.LOADING_ARTICLE): {
            return {
                ...state,
                currentAction: ArticleActions.LOADING_ARTICLE,
            };
        }

        case (ArticleActions.LOADED_ARTICLE): {
            return {
                ...state,
                currentAction: ArticleActions.LOADED_ARTICLE,
                article: action.article,
            };
        }

        case (ArticleActions.LOADING_ARTICLE_FAIL): {
            return {
                ...state,                
                currentAction: ArticleActions.LOADING_ARTICLE_FAIL,
            }
        }        

        default:
            return state;
    }
}