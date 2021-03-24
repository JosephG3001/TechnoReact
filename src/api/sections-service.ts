import Section from "../classes/section";
import { Global } from "../techno.config";

const loadSectionsFromApi = (): Promise<Section[]> => {
  return fetch(`${Global.contentUrl}/api/Section`)
    .then((result) => result.json())
    .then((result: Section[]) => {
      return result;
    });
};

export default loadSectionsFromApi;
