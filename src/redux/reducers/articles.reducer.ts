import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../..";
import ArticleEntity from "../../classes/article-entity";

export enum EArticlesState {
  Idle,
  Loading,
  Loaded,
  Failed,
}

export interface IArticlesState {
  currentState: EArticlesState;
  articleList: Array<ArticleEntity>;
}

const InitialArticlesState: IArticlesState = {
  currentState: EArticlesState.Idle,
  articleList: [],
};

const slice = createSlice({
  name: "articles",
  initialState: InitialArticlesState as IArticlesState,
  reducers: {
    loadingArticles(state) {
      state.currentState = EArticlesState.Loading;
    },
    loadedArticles(state, action: PayloadAction<ArticleEntity[]>) {
      state.currentState = EArticlesState.Loaded;
      state.articleList = action.payload;
    },
    loadArticlesFailed(state) {
      state.currentState = EArticlesState.Failed;
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
