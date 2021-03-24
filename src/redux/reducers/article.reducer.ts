import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ArticleEntity from "../../classes/article-entity";

export interface IArticleState {
  article: ArticleEntity | null;
}

const InitialArticleState: IArticleState = {
  article: null,
};

const slice = createSlice({
  name: "article",
  initialState: InitialArticleState as IArticleState,
  reducers: {
    loadedArticle(state, action: PayloadAction<ArticleEntity>) {
      state.article = action.payload;
    },
  },
});

export const articleReducer = slice.reducer;
export const { loadedArticle } = slice.actions;
