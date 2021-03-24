import Section from "../classes/section";
import { Global } from "../techno.config";
import { showErrorToast } from "../tools/toast";

const loadSectionsFromApi = (): Promise<Section[]> => {
  return fetch(`${Global.contentUrl}/api/Section`)
    .then((result) => result.json())
    .then((result: Section[]) => {
      return result;
    })
    .catch((error: string) => {
      showErrorToast(error);
      return [];
    });
};

export default loadSectionsFromApi;
