import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../redux-dispatch";
import { AppState } from "../../redux/reducers/root.reducer";
import Section from "../../classes/section";
import ArticleEntity from "../../classes/article-entity";
import * as ArticlesActions from './../../redux/actions/articles.actions';
import * as ArticleActions from './../../redux/actions/article.actions';
import * as NewsActions from './../../redux/actions/news.actions';
import NewsEntity from "../../classes/news-entity";

export interface IDataLoaderProps {
    LoadingNewsAction?(): void;
    LoadedNewsAction?(news: NewsEntity[]): void;
    LoadingNewsFailedAction?(errorMsg: string): void;
    
    LoadingSectionsAction?(): void;
    LoadedSectionsAction?(sections: Section[]): void;
    LoadedSectionsFailed?(errorMsg: string): void;

    ResetArticlesToIdleState?(): void;
    LoadingArticlesAction?(): void;
    LoadedArticlesAction?(articles: ArticleEntity[], section: string, tech: string): void;
    LoadedArticlesFailed?(errorMsg: string): void;

    LoadingArticleAction?(): void;
    LoadedArticleAction?(articleEntity: ArticleEntity, section: string, tech: string, articleName: string): void;
    LoadedArticleFailed?(errorMsg: string): void;  
    appState?: AppState
}

export class DataLoader extends React.Component<IDataLoaderProps, AppState> {
    constructor(props: IDataLoaderProps) {
        super(props);

        if (props.appState)
            this.state = props.appState;        
    }

    componentDidMount() {       
        this.pushLoadingSectionsToStore();
    }

    componentWillReceiveProps(nextProps: IDataLoaderProps) {
        if (nextProps.appState) {
            this.state = nextProps.appState;
        }

        if (this.state.news.currentAction === NewsActions.LOAD_NEWS_REQUESTED_c) {
            this.loadNewsFromServer();
        }

        if (this.state.articles.currentAction === ArticlesActions.IDLE_ARTICLES_c) {
            if (this.state.sections.menuItems.length > 0)
                this.loadArticlesFromServer();            
        }

        if (this.state.articles.currentAction === ArticlesActions.LOAD_ARTICLES_REQUESTED_c) {
            if (this.state.sections.menuItems.length > 0)
                this.loadArticlesFromServer();
        }
        
        if (this.state.article.currentAction === ArticleActions.LOAD_ARTICLE_REQUESTED_c) {
            if (this.state.sections.menuItems.length > 0 &&
                this.state.articles.articleList.length > 0) {
                    this.loadArticleFromServer();
            }            
        }
    }

    loadNewsFromServer() {
        if (this.props.LoadingNewsAction)
            this.props.LoadingNewsAction();

        fetch("http://api.technolibrary.co.uk/api/News?page=1&showcount=100")
        .then(result => result.json())
        .then(
            (result: NewsEntity[]) => {
                if (this.props.LoadedNewsAction)
                    this.props.LoadedNewsAction(result);
            },
            (error) => {
                if (this.props.LoadingNewsFailedAction)
                    this.props.LoadingNewsFailedAction(error);
            }
        );
    }    

    pushLoadingSectionsToStore() {
        if (this.state.sections.menuItems.length > 0)
            return;

        if (this.props.LoadingSectionsAction)
            this.props.LoadingSectionsAction();
        
        fetch("http://api.technolibrary.co.uk/api/Section")
        .then(result => result.json())
        .then(
            (result: Section[]) => {
                result.forEach(m => m.visible = false);                
                if (this.props.LoadedSectionsAction)
                    this.props.LoadedSectionsAction(result);
            },
            (error) => {
                if (this.props.LoadedSectionsFailed)
                    this.props.LoadedSectionsFailed(error);                
            }
        );
    }

    loadArticlesFromServer(): boolean {
        let params = window.location.href.split('/');
        let sec = decodeURIComponent(params[4]);
        let tech = decodeURIComponent(params[5]); 
        
        if (sec === 'undefined' || tech === 'undefined') 
            return false;
        
        if (sec === this.state.articles.section && tech === this.state.articles.tech) {
            if (this.state.articles.currentAction === ArticlesActions.LOAD_ARTICLES_REQUESTED_c) {
                if (this.props.ResetArticlesToIdleState)
                    this.props.ResetArticlesToIdleState();
            }
            return false;            
        }         

        let parent = this.state.sections.menuItems.find(s => s.sectionName === sec);
        if (!parent) 
            return false;

        let section = parent.inverseParentSection.find(s => { 
            return s.sectionName === tech && s.parentSectionName == sec;
        });

        if (!section) 
            return false;

        if (this.props.LoadingArticlesAction)
            this.props.LoadingArticlesAction();            

        fetch("http://api.technolibrary.co.uk/api/articles?id=" + section.sectionId)
        .then(result => result.json())
        .then(
            (result: ArticleEntity[]) => {
                let articles = result.filter(r => r.visible === true);
                if (this.props.LoadedArticlesAction)
                    this.props.LoadedArticlesAction(articles, sec, tech);
            },
            (error) => {
                if (this.props.LoadedArticlesFailed) 
                    this.props.LoadedArticlesFailed(error);                                                    
            }
        )
        return true;
    }

    loadArticleFromServer(): boolean {
        let params = window.location.href.split('/');
        let sec = decodeURIComponent(params[4]);
        let tech = decodeURIComponent(params[5]);
        let articleName = decodeURIComponent(params[7]);
        
        if (sec === 'undefined' || tech === 'undefined' || articleName === 'undefined')
            return false;

        if (sec === this.state.article.section && tech === this.state.article.tech && articleName === this.state.article.articleName)
            return false;

        let article = this.state.articles.articleList.find(a => a.articleName === articleName);
        if (!article)
            return false;

        if (this.state.articles.currentAction === ArticlesActions.LOADED_ARTICLES_c) {
            if (this.props.ResetArticlesToIdleState)
                this.props.ResetArticlesToIdleState();
        }
            
            
        if (this.props.LoadedArticleAction) {

            if (this.props.LoadingArticleAction)
                this.props.LoadingArticleAction();

            this.props.LoadedArticleAction(
                article, 
                decodeURIComponent(sec),
                decodeURIComponent(tech),
                decodeURIComponent(articleName));
            return true;
        }
        return false;
    }    
    
    render() {
        return <div className="data-placeholder"></div>
    }
}


const mapStateToProps = (state: AppState, ownProps: IDataLoaderProps): IDataLoaderProps => {
    return {
        ...ownProps,
        appState: state,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataLoader)