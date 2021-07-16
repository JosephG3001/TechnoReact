import { loadSectionsFromApi } from "../../../api/sections-service";
import Section from "../../../classes/section";
import { showErrorToast } from "../../../tools/toast";
import { AppDispatch } from "../../store";
import {
  loadedSections,
  loadingSections,
  loadSectionsFailed,
} from "../sections.reducer";

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

export default loadSections;
