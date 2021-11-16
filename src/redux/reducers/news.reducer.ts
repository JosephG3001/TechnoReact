import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadNewsFromApi } from "../../api/news-service";
import NewsEntity from "../../classes/news-entity";
import ELoadingState from "../../enums/loading-state";
import { showErrorToast } from "../../tools/toast";
import { AppDispatch, AppState } from "../store";

export interface INewsState {
  currentState: ELoadingState;
  news: NewsEntity[];
}

const InitialNewsState: INewsState = {
  currentState: ELoadingState.Idle,
  news: [],
};

const slice = createSlice({
  name: "news",
  initialState: InitialNewsState as INewsState,
  reducers: {
    loadingNews(state) {
      state.currentState = ELoadingState.Loading;
    },
    loadedNews(state, action: PayloadAction<NewsEntity[]>) {
      state.currentState = ELoadingState.Loaded;
      state.news = action.payload;
    },
    loadNewsFailed(state) {
      state.currentState = ELoadingState.Failed;
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
