import { combineReducers, createStore } from "redux";
import { sectionsReducer } from "./sections.reducer";
import { articlesReducer } from "./articles.reducer";
import { articleReducer } from "./article.reducer";
import { newsReducer } from "./news.reducer";

export const rootReducer = combineReducers({ 
    sections: sectionsReducer,
    articles: articlesReducer,
    article: articleReducer,
    news: newsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);