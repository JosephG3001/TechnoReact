import { configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { combineReducers } from "redux";
import { loadUser, reducer as oidcReducer } from "redux-oidc";
import { articlesReducer } from "./reducers/articles.reducer";
import { errorReducer } from "./reducers/error.reducer";
import { newsReducer } from "./reducers/news.reducer";
import { sectionsReducer } from "./reducers/sections.reducer";
import userManager from "./userManager";

// const oidcMiddleware = createOidcMiddleware(userManager);
export const history: History = createBrowserHistory();

const rootReducer = combineReducers({
  sections: sectionsReducer,
  articles: articlesReducer,
  news: newsReducer,
  router: connectRouter(history),
  oidcState: oidcReducer,
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

// export default function configureStore(history: History) {

//     userManager.events.addSilentRenewError(function(error) {
//         console.error('Error while renewing the access token', error);
//     });

//     userManager.events.addAccessTokenExpiring(function(event: any) {
//         console.log('Access Token Expiring');
//     });

//     userManager.events.addAccessTokenExpired(function(event: any) {
//         console.error('Access Token Expired');
//     });

//     userManager.events.addUserLoaded(function(event: any) {
//         console.log('User loaded / Silent refresh completed');
//         updateAccessToken();
//     });

//     const oidcMiddleware = createOidcMiddleware(userManager);
//     const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // add support for Redux dev tools

//     return createStore(
//         rootReducer(history),
//         composeEnhancers(
//             applyMiddleware(
//                 oidcMiddleware,
//                 thunk,
//                 reduxImmutableStateInvariant(),
//                 routerMiddleware(history))
//                 )
//     );
// }
