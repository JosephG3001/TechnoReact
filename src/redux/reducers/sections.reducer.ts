import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadSectionsFromApi } from "../../api/sections-service";
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

const mapNewSectionsUpdateSection = (
  sectionToUpdate: Section,
  sections: Section[]
) => {
  return sections.map((sec) => {
    return {
      ...sec,
      sectionName:
        sectionToUpdate.sectionId === sec.sectionId
          ? sectionToUpdate.sectionName
          : sec.sectionName,
      inverseParentSection: mapNewSectionsUpdateSection(
        sectionToUpdate,
        sec.inverseParentSection
      ),
    };
  });
};

export const updateSectionInRedux = (sectionToUpdate: Section) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const sections = getState().sections.menuItems;
  const newSections = mapNewSectionsUpdateSection(sectionToUpdate, sections);
  dispatch(loadedSections(newSections));
};

const mapNewSectionsAddSection = (
  sectionToAdd: Section,
  sections: Section[]
) => {
  return sections.map((sec) => {
    if (sectionToAdd.parentSectionId === sec.sectionId) {
      return {
        ...sec,
        inverseParentSection: [
          ...mapNewSectionsAddSection(sec, sec.inverseParentSection),
          sectionToAdd,
        ],
      };
    }
    return {
      ...sec,
      inverseParentSection: mapNewSectionsAddSection(
        sec,
        sec.inverseParentSection
      ),
    };
  });
};

export const addSectionToRedux = (sectionToAdd: Section) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const sections = getState().sections.menuItems;
  const newSections: Array<Section> = mapNewSectionsAddSection(
    sectionToAdd,
    sections
  );
  if (sectionToAdd.parentSectionId === null) {
    newSections.push(sectionToAdd);
  }

  dispatch(loadedSections(newSections));
};

const mapNewSectionsDeleteSection = (
  sectionId: string,
  sections: Section[]
) => {
  const newSections: Section[] = [];
  let decreaseDisplayOrder = false;

  for (let i = 0; i < sections.length; i++) {
    if (sections[i].sectionId === sectionId) {
      decreaseDisplayOrder = true;
    } else {
      newSections.push({
        ...sections[i],
        displayOrder: decreaseDisplayOrder
          ? sections[i].displayOrder - 1
          : sections[i].displayOrder,
      });
    }
  }
  return newSections;
};

export const removeSectionFromRedux = (sectionId: string) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const sections = getState().sections.menuItems;
  dispatch(loadedSections(mapNewSectionsDeleteSection(sectionId, sections)));
};
