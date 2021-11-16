import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ArticleEntity from "../../classes/article-entity";
import ELoadingState from "../../enums/loading-state";
import { AppState } from "../store";

export interface IArticlesState {
  currentState: ELoadingState;
  articleList: Array<ArticleEntity>;
}

const InitialArticlesState: IArticlesState = {
  currentState: ELoadingState.Idle,
  articleList: [],
};

const slice = createSlice({
  name: "articles",
  initialState: InitialArticlesState as IArticlesState,
  reducers: {
    loadingArticles(state) {
      state.currentState = ELoadingState.Loading;
    },
    loadedArticles(state, action: PayloadAction<ArticleEntity[]>) {
      state.currentState = ELoadingState.Loaded;
      state.articleList = action.payload;
    },
    loadArticlesFailed(state) {
      state.currentState = ELoadingState.Failed;
    },
  },
});

export const articlesReducer = slice.reducer;
export const {
  loadingArticles,
  loadedArticles,
  loadArticlesFailed,
} = slice.actions;

export const selectArticlesState = (state: AppState) =>
  state.articles.currentState;
export const selectArticles = (state: AppState) => state.articles.articleList;
