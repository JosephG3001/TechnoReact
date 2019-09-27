import { Dispatch, AnyAction } from "redux";
import * as ArticleActions from '../redux/actions/article.actions';
import * as ArticlesActions from '../redux/actions/articles.actions';
import * as SectionsActions from '../redux/actions/sections.actions';
import * as NewsActions from '../redux/actions/news.actions';
import ArticleEntity from "../classes/article-entity";
import Section from "../classes/section";
import NewsEntity from "../classes/news-entity";


export default function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        LoadingNewsAction: () => dispatch({ type: NewsActions.LOADING_NEWS_c }),        
        LoadingNewsFailedAction: (errorMsg: string) => dispatch({ type: NewsActions.LOADING_NEWS_FAILED_c }),
        LoadedNewsAction: function(news: NewsEntity[]){
            dispatch({
                type: NewsActions.LOADED_NEWS_c,
                news: news
            })
        },

        LoadingSectionsAction: () => dispatch({ type: SectionsActions.LOADING_SECTIONS_c }),
        LoadedSectionsAction: (sections: Section[]) => dispatch({ type: SectionsActions.LOADED_SECTIONS_c, sections: sections }),
        LoadedSectionsFailed: (errorMsg: string) => dispatch({ type: SectionsActions.LOAD_SECTIONS_FAILED_c, errorMsg: errorMsg }),
        
        LoadingArticleAction: () => dispatch({ type: ArticleActions.LOADING_ARTICLE_c }),
        LoadedArticleFailed: (errorMsg: string) => dispatch({ type: ArticleActions.LOADING_ARTICLE_FAIL_c, errorMsg: errorMsg }),
        LoadedArticleAction: function(articleEntity: ArticleEntity, section: string, tech: string, articleName: string) {
            dispatch({ 
                type: ArticleActions.LOADED_ARTICLE_c, 
                article: articleEntity,
                section: section,
                tech: tech,
                articleName: articleName,
            })
        },

        ResetArticlesToIdleState: () => dispatch({ type: ArticlesActions.IDLE_ARTICLES_c }),        
        LoadingArticlesAction: () => dispatch({ type: ArticlesActions.LOADING_ARTICLES_c }),
        LoadedArticlesFailed : (errorMsg: string) => dispatch({ type: ArticlesActions.LOAD_ARTICLES_FAIL_c, errorMsg: errorMsg }),
        LoadedArticlesAction: function(articles: ArticleEntity[], section: string, tech: string) {
            dispatch({ 
                type: ArticlesActions.LOADED_ARTICLES_c, 
                articles: articles,
                section: section,
                tech: tech         
            })
        },
    }    
}
