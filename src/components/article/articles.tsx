import React from 'react';
import './articles.scss';
import { CircularProgress } from '@material-ui/core';
import { AppState } from '../../redux/reducers/root.reducer';
import { IArticlesState } from '../../redux/reducers/articles.reducer';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import * as ArticleActions from './../../redux/actions/articles.actions';
import { Link } from 'react-router-dom';
import { ISectionsState } from '../../redux/reducers/sections.reducer';

export interface IArticlesProps {    
    RequestArticlesLoad(): void;
    ResetArticlesToIdleState(): void;
    articlesState?: IArticlesState;
    sectionsState?: ISectionsState;
};

// export const InitialArticlesProps = {
//     RequestArticlesLoad() {},
//     ResetArticlesToIdleState() {},
//     articlesState: {},
//     sectionsState: {},
// } as IArticlesProps;

export class Articles extends React.Component<IArticlesProps, IArticlesState> {
    constructor (props: IArticlesProps) {
        super(props);

        if (props.articlesState) {
            this.state = {
                ...props.articlesState,
            };
        }

        if (this.props.RequestArticlesLoad)
            this.props.RequestArticlesLoad();    
    }

    componentWillReceiveProps(nextProps: IArticlesProps) {
        if (!nextProps.sectionsState) return;
        if (nextProps.sectionsState.menuItems.length === 0) return;
        
        if (nextProps.articlesState &&
            nextProps.articlesState.currentAction !== ArticleActions.LOAD_ARTICLES_REQUESTED_c) {
            this.state = {
                ...nextProps.articlesState,
            };
        }

        if (this.state.currentAction === ArticleActions.LOADED_ARTICLES_c)
            this.props.ResetArticlesToIdleState();

        if (this.state.currentAction === ArticleActions.IDLE_ARTICLES_c &&
            this.state.location !== window.location.href) {
            this.props.RequestArticlesLoad();
        }
    }

    render() {
        if (this.state.currentAction == ArticleActions.LOAD_ARTICLES_FAIL_c) {
            return (
                <div className="error">
                    Error: {this.state.errorMsg}
                </div>
            );             
        } else if (this.state.currentAction == ArticleActions.LOADING_ARTICLES_c) {
            return (
                <div className="loading-spinner-container">
                    <CircularProgress className="mat-spinner"></CircularProgress>
                    <div>
                        Loading articles...
                    </div>
                </div>
            );
        } else {
            return (
                <div className="articles">
                    <div className="articles-jumbotron">
                        <h1>{this.state.section}</h1>
                        <h2>{this.state.tech}</h2>
                    </div>
                    {this.state.articleList.map(item => (
                        <Link key={item.articleId} 
                              className="articles-row" 
                              to={{ pathname: "/articles/" + encodeURIComponent(this.state.section) + "/" + encodeURIComponent(this.state.tech) + "/article/" + encodeURIComponent(item.articleName) }} >
                            <div className="material-icons">insert_drive_file</div>
                            <h3>{item.articleName}</h3>
                            <label>{new Date(item.articleDate).toDateString()}</label>
                        </Link>
                    ))}
                </div>
            );
        }
    }
}

const mapStateToProps = (state: AppState, ownProps: IArticlesProps): IArticlesProps => {
    return {
        ...ownProps,
        articlesState: { 
             ...state.articles,
        },    
        sectionsState: {
            ...state.sections
        }        
    };
};

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        RequestArticlesLoad: () => dispatch({ type: ArticleActions.LOAD_ARTICLES_REQUESTED_c }),
        ResetArticlesToIdleState: () => dispatch({ type: ArticleActions.IDLE_ARTICLES_c }),
    }    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Articles)