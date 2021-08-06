import Section from "../../../classes/section";
import { AppDispatch, AppState } from "../../store";
import { loadedSections } from "../sections.reducer";

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

export default removeSectionFromRedux;
