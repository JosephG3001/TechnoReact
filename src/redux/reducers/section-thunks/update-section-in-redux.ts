import Section from "../../../classes/section";
import { AppDispatch, AppState } from "../../store";
import { loadedSections } from "../sections.reducer";

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

const updateSectionInRedux = (sectionToUpdate: Section) => (
  dispatch: AppDispatch,
  getState: () => AppState
) => {
  const sections = getState().sections.menuItems;
  const newSections = mapNewSectionsUpdateSection(sectionToUpdate, sections);
  dispatch(loadedSections(newSections));
};

export default updateSectionInRedux;
