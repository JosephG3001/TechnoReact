import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadNewsFromApi } from '../../api/news-service';
import NewsEntity from '../../classes/news-entity';
import { INewsState } from '../../redux/reducers/news.reducer';
import { AppState, store } from '../../redux/reducers/root.reducer';
import * as NewsActions from './../../redux/actions/news.actions';
import './news.scss';

interface INewsProps {
    
}

export const News: React.FC<INewsProps> = () => {

    const newsState: INewsState = useSelector((state: AppState) => state.news);

    useEffect(() => {
        loadNewsFromApi().then((result: NewsEntity[]) => {
            store.dispatch({ type: NewsActions.LOADED_NEWS, news: result });
        });
    }, []);

    return (
        <div>
            {newsState.currentAction === NewsActions.LOADING_NEWS &&
                <div className="loading-spinner-container">
                    <CircularProgress className="mat-spinner"></CircularProgress>
                    <div>
                        Loading news...
                    </div>
                </div>
            }

            {newsState.currentAction === NewsActions.LOADED_NEWS &&            
                <div className="news">
                    {newsState.news.map(item => (
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
            }
        </div>
    );
}

export default News;
