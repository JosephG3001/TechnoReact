import { createSlice } from "@reduxjs/toolkit";
import { User } from "oidc-client";
import { Action, USER_FOUND } from "redux-oidc";
import { AppState } from "../store";

export interface IUserState {
  userInitials: string | null;
}

const initialState: IUserState = {
  userInitials: null,
};

const buildUserInitials = (user: User) => {
  let buildInitials = "";
  buildInitials += user.profile.given_name ? user.profile.given_name[0] : "";
  buildInitials += user.profile.family_name ? user.profile.family_name[0] : "";
  return buildInitials;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(USER_FOUND, (state, action: Action<User>) => {
      if (action.payload) {
        state.userInitials = buildUserInitials(action.payload);
      }
    });
  },
});

export const userReducer = userSlice.reducer;

export const selectUserInitials = (state: AppState) =>
  state.userState.userInitials;

export const selectUser = (state: AppState) => state.oidcState?.user;
