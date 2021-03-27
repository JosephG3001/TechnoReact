import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { reducer as oidcReducer } from "redux-oidc";
import { articlesReducer } from "./reducers/articles.reducer";
import { errorReducer } from "./reducers/error.reducer";
import { newsReducer } from "./reducers/news.reducer";
import { sectionsReducer } from "./reducers/sections.reducer";

// export const technoHistory = createBrowserHistory();

// const oidcMiddleware = createOidcMiddleware(userManager);
export const history: History = createBrowserHistory();
// eslint-disable-next-line import/prefer-default-export
export const getStore = () =>
  configureStore({
    reducer: combineReducers({
      sections: sectionsReducer,
      articles: articlesReducer,
      news: newsReducer,
      router: connectRouter(history),
      oidcState: oidcReducer,
      errorState: errorReducer,
    }),
    // middleware: (getDefaultMiddleware) => oidcMiddleware,
    // getDefaultMiddleware({}).concat(routerMiddleware(technoHistory)),
  });

export const store = getStore();
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type AppState = ReturnType<typeof technoStore.getState>;
// export type AppDispatch = typeof technoStore.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

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
