import ArticleEntity from "../../classes/article-entity";
import * as ArticlesActions from "../actions/articles.actions";
import Section from "../../classes/section";

export interface IArticlesState {
    currentAction: ArticlesActions.ARTICLES,
    articleList: Array<ArticleEntity>;
    sections: Array<Section>;
    errorMsg: string;    
    location: string;
    section: string;
    tech: string;  
}

export const InitialArticlesState: IArticlesState = {
    currentAction: ArticlesActions.IDLE_ARTICLES_c,
    articleList: new Array<ArticleEntity>(),
    sections: new Array<Section>(),
    errorMsg: '',
    location: '',
    section: '',
    tech: ''
}

export function articlesReducer(state: IArticlesState = InitialArticlesState, action: ArticlesActions.Actions) : IArticlesState {
    switch (action.type) {
        case (ArticlesActions.LOAD_ARTICLES_REQUESTED_c): {
            return {
                ...state,
                currentAction: ArticlesActions.LOAD_ARTICLES_REQUESTED_c,
                location: window.location.href,
            }
        }

        case (ArticlesActions.IDLE_ARTICLES_c): {
            return {
                ...state,
                currentAction: ArticlesActions.IDLE_ARTICLES_c,
                //location: window.location.href,
            }
        }        

        case (ArticlesActions.LOADING_ARTICLES_c): {
            return {
                ...state,
                currentAction: ArticlesActions.LOADING_ARTICLES_c,
                location: window.location.href,
            }
        }

        case (ArticlesActions.LOADED_ARTICLES_c): {
            return {
                ...state,
                articleList: action.articles,
                currentAction: ArticlesActions.LOADED_ARTICLES_c,
                location: window.location.href,
                section: action.section,
                tech: action.tech
            }
        }

        case (ArticlesActions.LOAD_ARTICLES_FAIL_c): {
            return {
                ...state,
                errorMsg: action.errorMsg,
                currentAction: ArticlesActions.LOAD_ARTICLES_FAIL_c,
            }
        }

        default:
            return state;
    }
}
