import Section from "../../../classes/section";
import { AppDispatch, AppState } from "../../store";
import { loadedSections } from "../sections.reducer";

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

const addSectionToRedux = (sectionToAdd: Section) => (
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

export default addSectionToRedux;
