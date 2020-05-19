import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ArticlesActions from '../../redux/actions/articles.actions';
import { AppState } from '../../redux/reducers/root.reducer';
import { tryStoreCurrentTechAndSubsection } from '../../tools/url-helper';
import './articles.scss';

export interface IArticlesProps {    

}

export const Articles: React.FC<IArticlesProps> = (props) => {

    const articlesState = useSelector((state: AppState) => state.articles);
    const sectionsState = useSelector((state: AppState) => state.sections);

    useEffect(() => {
        tryStoreCurrentTechAndSubsection();
    });    

    return (
        <div>
            {sectionsState.currentTech && sectionsState.currentSubSection &&
                <div className="articles">
                    <div className="articles-jumbotron">
                        <h1>{sectionsState.currentTech.sectionName}</h1>
                        <h2>{sectionsState.currentSubSection.sectionName}</h2>
                    </div>  

                    {articlesState.currentAction === ArticlesActions.LOADING_ARTICLES &&
                        <div className="loading-spinner-container">
                            <CircularProgress className="mat-spinner"></CircularProgress>
                            <div>
                                Loading articles...
                            </div>
                        </div>
                    }

                    {articlesState.currentAction === ArticlesActions.LOADED_ARTICLES && 
                     articlesState.articleList && 
                     articlesState.articleList.map(item => (
                         
                        <Link key={item.articleId} 
                              className="articles-row" 
                              to={{ pathname: "/articles/" + encodeURIComponent(sectionsState.currentTech!.sectionName) + "/" + encodeURIComponent(sectionsState.currentSubSection!.sectionName) + "/article/" + encodeURIComponent(item.articleName) }} >
                            <div className="material-icons">insert_drive_file</div>
                            <h3>{item.articleName}</h3>
                            <label>{new Date(item.articleDate).toDateString()}</label>
                        </Link>
                    ))}
                </div>
            }            
        </div>
    );
}

export default Articles;