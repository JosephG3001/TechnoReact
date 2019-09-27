import ArticleEntity from './../../classes/article-entity';
import * as ArticleActions from './../actions/article.actions';

export interface IArticleState {
    currentAction: ArticleActions.ARTICLE;
    errorMsg: string;    
    location: string;
    section: string;
    tech: string;
    articleName: string;
    article: ArticleEntity | null;
}

const InitialArticleState: IArticleState = {
    currentAction: ArticleActions.IDLE_ARTICLE_c,
    errorMsg: '',
    location: '',
    section: '',
    tech: '',
    articleName: '',
    article: null,
}

export function articleReducer(state: IArticleState = InitialArticleState, action: ArticleActions.Actions): IArticleState {
    switch (action.type) {
        case (ArticleActions.LOAD_ARTICLE_REQUESTED_c): {
            return {
                ...state,
                currentAction: ArticleActions.LOAD_ARTICLE_REQUESTED_c,
                location: '',
                articleName: '',
                section: '',
                tech: '',
            }
        }

        case (ArticleActions.IDLE_ARTICLE_c): {
            return {
                ...state,
                currentAction: ArticleActions.IDLE_ARTICLE_c,
            }
        }

        case (ArticleActions.LOADING_ARTICLE_c): {
            return {
                ...state,
                currentAction: ArticleActions.LOADING_ARTICLE_c,
                location: window.location.href,
            };
        }

        case (ArticleActions.LOADED_ARTICLE_c): {
            return {
                ...state,
                currentAction: ArticleActions.LOADED_ARTICLE_c,
                location: window.location.href,
                section: action.section,
                tech: action.tech,
                articleName: action.articleName,
                article: action.article,
            };
        }

        case (ArticleActions.LOADING_ARTICLE_FAIL_c): {
            return {
                ...state,
                errorMsg: action.errorMsg,
                currentAction: ArticleActions.LOADING_ARTICLE_FAIL_c,
            }
        }        

        default:
            return state;
    }
}