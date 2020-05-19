import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ArticleEntity from '../../classes/article-entity';
import { getArticleFromUrl, tryStoreCurrentTechAndSubsection } from '../../tools/url-helper';
import './article.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/root.reducer';
import * as ArticleActions from '../../redux/actions/articles.actions';

declare var SyntaxHighlighter: any;

export interface IArticleProps {

}

export const Article: React.FC<IArticleProps> = (props) => {
    
    const sectionsState = useSelector((state: AppState) => state.sections);
    const articlesState = useSelector((state: AppState) => state.articles);
    const [article, setArticle] = useState<ArticleEntity>();

    useEffect(() => {
        tryStoreCurrentTechAndSubsection();
        const articleFromUrl = getArticleFromUrl();
        if (articleFromUrl) {
            if (!article || article.articleId !== articleFromUrl.articleId) {
                setArticle(articleFromUrl);
                highlight();
            }            
        }
    }, [articlesState.currentAction, sectionsState.currentAction]);
    
    function highlight() {
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

    return (
        <React.Fragment>
            {articlesState.currentAction === ArticleActions.LOADED_ARTICLES && article &&
                <div className="article">
                <div className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.articleHtml }}>
                    </div>
                </div>
            }

            {articlesState.currentAction === ArticleActions.LOADING_ARTICLES &&
                <div className="loading-spinner-container">
                    <CircularProgress className="mat-spinner"></CircularProgress>
                    <div>
                        Loading article...
                    </div>
                </div>   
            }
        </React.Fragment>
    );
}

export default Article;