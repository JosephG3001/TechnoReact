import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadLatestArticlesFromApi } from "../../api/article-service";
import ArticleEntity from "../../classes/article-entity";
import ELoadingState from "../../enums/loading-state";
import { showErrorToast } from "../../tools/toast";
import { AppDispatch, AppState } from "../store";

export interface ILatestArticlesState {
  currentState: ELoadingState;
  articleList: Array<ArticleEntity>;
}

const InitialArticlesState: ILatestArticlesState = {
  currentState: ELoadingState.Idle,
  articleList: [],
};

const slice = createSlice({
  name: "latest-articles",
  initialState: InitialArticlesState as ILatestArticlesState,
  reducers: {
    loadingLatestArticles(state) {
      state.currentState = ELoadingState.Loading;
    },
    loadedLatestArticles(state, action: PayloadAction<ArticleEntity[]>) {
      state.currentState = ELoadingState.Loaded;
      state.articleList = action.payload;
    },
    loadLatestArticlesFailed(state) {
      state.currentState = ELoadingState.Failed;
    },
  },
});

export const latestArticlesReducer = slice.reducer;
export const {
  loadingLatestArticles,
  loadedLatestArticles,
  loadLatestArticlesFailed,
} = slice.actions;

export const selectLatestArticlesState = (state: AppState) =>
  state.latestArticles.currentState;
export const selectLatestArticles = (state: AppState) =>
  state.latestArticles.articleList;

export const loadLatestArticles = () => (dispatch: AppDispatch) => {
  dispatch(loadingLatestArticles());
  loadLatestArticlesFromApi()
    .then((articles) => {
      dispatch(loadedLatestArticles(articles));
    })
    .catch((error) => {
      showErrorToast(error);
      dispatch(loadLatestArticlesFailed());
    });
};
