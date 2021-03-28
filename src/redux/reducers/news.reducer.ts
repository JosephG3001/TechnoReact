import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadNewsFromApi } from "../../api/news-service";
import NewsEntity from "../../classes/news-entity";
import { showErrorToast } from "../../tools/toast";
import { AppDispatch, AppState } from "../store";

export enum ENewsState {
  Idle,
  Loading,
  Loaded,
  Failed,
}

export interface INewsState {
  currentState: ENewsState;
  news: NewsEntity[];
}

const InitialNewsState: INewsState = {
  currentState: ENewsState.Idle,
  news: [],
};

const slice = createSlice({
  name: "news",
  initialState: InitialNewsState as INewsState,
  reducers: {
    loadingNews(state) {
      state.currentState = ENewsState.Loading;
    },
    loadedNews(state, action: PayloadAction<NewsEntity[]>) {
      state.currentState = ENewsState.Loaded;
      state.news = action.payload;
    },
    loadNewsFailed(state) {
      state.currentState = ENewsState.Failed;
    },
  },
});

export const newsReducer = slice.reducer;
export const { loadingNews, loadedNews, loadNewsFailed } = slice.actions;

export const selectNews = (state: AppState) => state.news.news;
export const selectNewsState = (state: AppState) => state.news.currentState;

export const loadNews = () => (dispatch: AppDispatch) => {
  dispatch(loadingNews());
  return loadNewsFromApi()
    .then((result: NewsEntity[]) => {
      if (result) {
        dispatch(loadedNews(result));
      }
    })
    .catch((error: string) => {
      showErrorToast(error);
      dispatch(loadNewsFailed());
    });
};
