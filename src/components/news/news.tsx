import React from 'react';
import './news.scss';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers/root.reducer';
import { INewsState } from '../../redux/reducers/news.reducer';
import { AnyAction, Dispatch } from 'redux';
import * as NewsActions from './../../redux/actions/news.actions';
import { CircularProgress } from '@material-ui/core';

interface INewsProps {
    RequestNewsLoad(): void;
    ResetNewsToIdleState(): void;
    newsState?: INewsState
}

export class News extends React.Component<INewsProps, INewsState> {
    constructor(props: INewsProps) {
        super(props)

        if (props.newsState) {
            this.state = {
                ...props.newsState
            }
        }

        if (this.props.RequestNewsLoad)
            this.props.RequestNewsLoad();
    }

    componentWillReceiveProps(nextProps: INewsProps) {
        if (nextProps.newsState) {
            this.state = {
                ...nextProps.newsState
            }
        }
    }

    render() {
        if (this.state.currentAction === NewsActions.LOADING_NEWS_FAILED_c) {
            return (
                <div className="error">
                    Error: {this.state.errorMsg}
                </div>                
            );
        } else if (this.state.currentAction === NewsActions.LOADING_NEWS_c ||
                   this.state.currentAction === NewsActions.LOAD_NEWS_REQUESTED_c) {
            return (
                <div className="loading-spinner-container">
                    <CircularProgress className="mat-spinner"></CircularProgress>
                    <div>
                        Loading news...
                    </div>
                </div>
            );
        } else {
            return (
                <div className="news">
                    {this.state.news.map(item => (
                        <div key={item.newsId} className="news-item">
                            <div className="news-header">
                                <h3>{item.title}</h3>
                                <span>{new Date(item.createdDate).toDateString()}</span>
                            </div>
                            <div>
                                {item.html}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

const mapStateToProps = (state: AppState, ownProps: INewsProps): INewsProps => {
    return {
        ...ownProps,
        newsState: state.news
    }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        RequestNewsLoad: () => dispatch({ type: NewsActions.LOAD_NEWS_REQUESTED_c }),
        ResetNewsToIdleState: () => dispatch({ type: NewsActions.IDLE_NEWS_c }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(News)