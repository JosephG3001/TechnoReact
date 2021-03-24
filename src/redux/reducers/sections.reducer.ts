import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loadSectionsFromApi from "../../api/sections-service";
import Section from "../../classes/section";
import { AppDispatch, AppState } from "../store";

export enum ESectionsState {
  Idle,
  loading,
  loaded,
  Failed,
}

export interface ISectionsState {
  currentState: ESectionsState;
  menuItems: Array<Section>;
  currentTech?: Section;
  currentSubSection?: Section;
}

const InitialSectionsState: ISectionsState = {
  currentState: ESectionsState.Idle,
  menuItems: [],
};

const slice = createSlice({
  name: "sections",
  initialState: InitialSectionsState as ISectionsState,
  reducers: {
    loadingSections(state) {
      state.currentState = ESectionsState.loading;
    },
    loadedSections(state, action: PayloadAction<Section[]>) {
      state.currentState = ESectionsState.loaded;
      state.menuItems = action.payload;
      //  tryStoreCurrentTechAndSubsection();
    },
    loadSectionsFailed(state) {
      state.currentState = ESectionsState.Failed;
    },
    setCurrentTech(state, action: PayloadAction<Section>) {
      state.currentTech = action.payload;
    },
    setCurrentSubSection(state, action: PayloadAction<Section>) {
      state.currentSubSection = action.payload;
    },
  },
});

export const sectionsReducer = slice.reducer;
export const {
  loadingSections,
  loadedSections,
  loadSectionsFailed,
  setCurrentTech,
  setCurrentSubSection,
} = slice.actions;

export const selectCurrentTech = (state: AppState) =>
  state.sections.currentTech;
export const selectCurrentSubSection = (state: AppState) =>
  state.sections.currentSubSection;
export const selectSections = (state: AppState) => state.sections.menuItems;
export const selectSectionsState = (state: AppState) =>
  state.sections.currentState;

export const loadSections = () => (dispatch: AppDispatch) => {
  dispatch(loadingSections);
  return loadSectionsFromApi().then((sections: Section[]) => {
    dispatch(loadedSections(sections));
  });
};
