import React from 'react';
import './article.scss';
import { AppState } from '../../redux/reducers/root.reducer';
import { Dispatch, AnyAction } from 'redux';
import * as ArticleActions from './../../redux/actions/article.actions';
import { IArticleState } from '../../redux/reducers/article.reducer';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { IArticlesState } from '../../redux/reducers/articles.reducer';
import { ISectionsState } from '../../redux/reducers/sections.reducer';

declare var SyntaxHighlighter: any;

export interface IArticleProps {
    RequestArticleLoad(): void;
    ResetToIdleState(): void;
    articleState: IArticleState;
    articlesState: IArticlesState;
    sectionsState: ISectionsState;
}

export const InitialArticleState = {
    RequestArticleLoad() {},
    ResetToIdleState() {},
    articleState: {},
    articlesState: {},
    sectionsState: {},
} as IArticleProps;

export class Article extends React.Component<IArticleProps, IArticleState> {    
    constructor(props: IArticleProps) {
        super(props);

        if (props.articleState) {
            this.state = {
                ...props.articleState,
                article: null,
            };
        }

        if (this.props.RequestArticleLoad)            
            this.props.RequestArticleLoad();
    }    

    componentWillReceiveProps(nextProps: IArticleProps) {
        if (!nextProps.sectionsState) return;
        if (nextProps.sectionsState.menuItems.length === 0) return;        
        if (!nextProps.articlesState) return;
        if (nextProps.articlesState.articleList.length === 0) return;        

        if (nextProps.articleState) {
            this.state = {
                ...nextProps.articleState,
            };
        }

        if (this.state.currentAction === ArticleActions.LOADED_ARTICLE_c) 
            this.props.ResetToIdleState();

        if (this.state.currentAction === ArticleActions.IDLE_ARTICLE_c &&
            this.state.location !== window.location.href) {            
            this.props.RequestArticleLoad();   
        }

        this.highlight();
    }

    highlight() {
        let retries = 10;
        let tryHighlight = setTimeout(() => {
            SyntaxHighlighter.defaults['toolbar'] = false;
            SyntaxHighlighter.defaults['gutter'] = false;
            SyntaxHighlighter.all();  
            SyntaxHighlighter.highlight({gutter: false});            
            retries--;
            if (retries === 0) {
                clearTimeout(tryHighlight);
                return;
            }
        }, 100);
    }

    render() {
        if (this.state.currentAction == ArticleActions.LOADING_ARTICLE_FAIL_c) {
            return (
                <div className="error">
                    Error: {this.state.errorMsg}
                </div>
            );   
        } else if ((this.state.currentAction === ArticleActions.LOADING_ARTICLE_c ||
                   this.state.currentAction === ArticleActions.LOAD_ARTICLE_REQUESTED_c ||
                   this.state.currentAction === ArticleActions.IDLE_ARTICLE_c) &&
                   !this.state.article) {
            return (
                <div className="loading-spinner-container">
                    <CircularProgress className="mat-spinner"></CircularProgress>
                    <div>
                        Loading article...
                    </div>
                </div>               
            );
        } else {
            return (
                <div className="article"
                     dangerouslySetInnerHTML={{ __html: this.state.article!.articleHtml }}>
                </div>
            );
        }
    }
}

const mapStateToProps = (state: AppState, ownProps: IArticleProps): IArticleProps => {
    return {
        ...ownProps,
        articleState: { 
            ...state.article,      
        },    
        sectionsState: state.sections,
        articlesState: state.articles,        
    };
};

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        RequestArticleLoad: () => dispatch({ type: ArticleActions.LOAD_ARTICLE_REQUESTED_c }),
        ResetToIdleState: () => dispatch({ type: ArticleActions.IDLE_ARTICLE_c }),
    }    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Article)