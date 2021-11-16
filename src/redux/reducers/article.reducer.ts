import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadArticleFromApi } from "../../api/article-service";
import ArticleEntity from "../../classes/article-entity";
import ELoadingState from "../../enums/loading-state";
import { AppDispatch, AppState } from "../store";

export interface IArticleState {
  article: ArticleEntity | null;
  articleState: ELoadingState;
}

const InitialArticleState: IArticleState = {
  article: null,
  articleState: ELoadingState.Idle,
};

const slice = createSlice({
  name: "article",
  initialState: InitialArticleState as IArticleState,
  reducers: {
    loadingArticle(state) {
      state.article = null;
      state.articleState = ELoadingState.Loading;
    },
    loadedArticle(state, action: PayloadAction<ArticleEntity>) {
      state.article = action.payload;
      state.articleState = ELoadingState.Loaded;
    },
    loadArticleFailed(state) {
      state.articleState = ELoadingState.Failed;
    },
    clearArticle(state) {
      state.article = null;
      state.articleState = ELoadingState.Idle;
    },
  },
});

// Reducer
export const articleReducer = slice.reducer;
export const {
  loadingArticle,
  loadedArticle,
  loadArticleFailed,
  clearArticle,
} = slice.actions;

// Selectors
export const selectArticleState = (state: AppState) =>
  state.article.articleState;

export const selectArticleForEdit = (state: AppState) => state.article.article;

// Thunks
export const loadArticle = (articleId: string) => (dispatch: AppDispatch) => {
  dispatch(loadingArticle());
  loadArticleFromApi(articleId)
    .then((article) => {
      dispatch(loadedArticle(article));
    })
    .catch(() => {
      dispatch(loadArticleFailed());
    });
};

export const createNewArticle = (parentSectionId: string) => (
  dispatch: AppDispatch
) => {
  dispatch(loadingArticle());

  const article = new ArticleEntity();
  article.DisplayOrder = 0;
  article.articleHtml = "";
  article.sectionId = parentSectionId;
  article.visible = true;
  article.articleName = "--New Article--";
  article.articleDate = new Date().toString();
  article.createdByUserId = "";
  article.articleId = "";

  dispatch(loadedArticle(article));
};
