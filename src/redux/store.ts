import { configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { combineReducers } from "redux";
import { loadUser, reducer as oidcReducer } from "redux-oidc";
import { articleReducer } from "./reducers/article.reducer";
import { articlesReducer } from "./reducers/articles.reducer";
import { errorReducer } from "./reducers/error.reducer";
import { newsReducer } from "./reducers/news.reducer";
import { sectionsReducer } from "./reducers/sections.reducer";
import { userReducer } from "./reducers/user.reducer";
import userManager from "./userManager";

// const oidcMiddleware = createOidcMiddleware(userManager);
export const history: History = createBrowserHistory();

const rootReducer = combineReducers({
  sections: sectionsReducer,
  articles: articlesReducer,
  article: articleReducer,
  news: newsReducer,
  router: connectRouter(history),
  oidcState: oidcReducer,
  userState: userReducer,
  errorState: errorReducer,
});

const createStore = () => {
  const localStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(routerMiddleware(history)),
  });

  loadUser(localStore, userManager);

  return localStore;
};

export const store = createStore();
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
