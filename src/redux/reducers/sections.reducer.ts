import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loadSectionsFromApi from "../../api/sections-service";
import Section from "../../classes/section";
import { showErrorToast } from "../../tools/toast";
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

const getSectionChildren = (section: Section): Array<Section> => {
  const menuItems: Section[] = [];
  section.inverseParentSection.forEach((child) => {
    menuItems.push(...getSectionChildren(child));
  });
  return menuItems;
};

export const selectSectionsList = (state: AppState) => {
  const { menuItems } = state.sections;
  menuItems.forEach((section) => {
    menuItems.push(...getSectionChildren(section));
  });
  return menuItems;
};

// thunks
export const loadSections = () => (dispatch: AppDispatch) => {
  dispatch(loadingSections());
  return loadSectionsFromApi()
    .then((sections: Section[]) => {
      dispatch(loadedSections(sections));
    })
    .catch((error: string) => {
      showErrorToast(error);
      dispatch(loadSectionsFailed());
    });
};
