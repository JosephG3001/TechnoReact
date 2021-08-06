import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Section from "../../classes/section";
import { AppState } from "../store";

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

// Reducer
export const sectionsReducer = slice.reducer;
export const {
  loadingSections,
  loadedSections,
  loadSectionsFailed,
  setCurrentTech,
  setCurrentSubSection,
} = slice.actions;

// Selectors
export const selectCurrentTech = (state: AppState) =>
  state.sections.currentTech;

export const selectCurrentSubSection = (state: AppState) =>
  state.sections.currentSubSection;

export const selectSections = (state: AppState) => state.sections.menuItems;

export const selectSectionsState = (state: AppState) =>
  state.sections.currentState;

const searchForSection = (
  sections: Section[],
  sectionId?: string
): Section | null => {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].sectionId === sectionId) {
      return sections[i];
    }
    const child = searchForSection(sections[i].inverseParentSection, sectionId);
    if (child) {
      return child;
    }
  }
  return null;
};

export const selectSection = (sectionId?: string) =>
  createSelector([selectSections], (sections: Section[]) => {
    return searchForSection(sections, sectionId);
  });
