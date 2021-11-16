import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadLatestArticlesFromApi } from "../../api/article-service";
import RecentArticle from "../../classes/recent-article";
import ELoadingState from "../../enums/loading-state";
import findSection from "../../tools/section-utils";
import { showErrorToast } from "../../tools/toast";
import { AppDispatch, AppState } from "../store";

export interface ILatestArticlesState {
  currentState: ELoadingState;
  articleList: Array<RecentArticle>;
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
    loadedLatestArticles(state, action: PayloadAction<RecentArticle[]>) {
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

export const loadLatestArticles = () => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  dispatch(loadingLatestArticles());
  const sections = getState().sections.menuItems;
  loadLatestArticlesFromApi()
    .then((articles) => {
      const recentArticles: RecentArticle[] = [];
      articles.forEach((article) => {
        const section = findSection(article.sectionId, sections);
        recentArticles.push({
          article,
          section,
        });
      });
      dispatch(loadedLatestArticles(recentArticles));
    })
    .catch((error) => {
      showErrorToast(error);
      dispatch(loadLatestArticlesFailed());
    });
};
