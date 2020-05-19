import ArticleEntity from "../../classes/article-entity";
import * as ArticlesActions from "../actions/articles.actions";

export interface IArticlesState {
    currentAction: ArticlesActions.AllArticlesActions,
    articleList: Array<ArticleEntity>;
}

export const InitialArticlesState: IArticlesState = {
    currentAction: ArticlesActions.ARTICLES_IDLE,
    articleList: new Array<ArticleEntity>(),
}

export function articlesReducer(state: IArticlesState = InitialArticlesState, action: ArticlesActions.Actions) : IArticlesState {
    switch (action.type) {
        case (ArticlesActions.ARTICLES_IDLE): {
            return {
                ...state,
                currentAction: ArticlesActions.ARTICLES_IDLE,
            }
        }        

        case (ArticlesActions.LOADING_ARTICLES): {
            return {
                ...state,
                currentAction: ArticlesActions.LOADING_ARTICLES,
            }
        }

        case (ArticlesActions.LOADED_ARTICLES): {
            return {
                ...state,
                articleList: action.articleList,
                currentAction: ArticlesActions.LOADED_ARTICLES,
            }
        }

        case (ArticlesActions.LOAD_ARTICLES_FAIL): {
            return {
                ...state,
                currentAction: ArticlesActions.LOAD_ARTICLES_FAIL,
            }
        }    

        default:
            return state;
    }
}
