import Section from "../classes/section";
import { Global } from "../techno.config";
import { genericDelete, genericPost, genericPut } from "./apiUtils";

export const loadSectionsFromApi = (): Promise<Section[]> => {
  return fetch(`${Global.contentUrl}/api/Section`)
    .then((result) => result.json())
    .then((result: Section[]) => {
      return result;
    });
};

export const postSection = (section: Section) => {
  return genericPost<Section, Section>(
    `${Global.contentUrl}/api/Section`,
    section
  );
};

export const putSection = (section: Section) => {
  return genericPut(`${Global.contentUrl}/api/Section`, section);
};

export const deleteSection = (sectionId: string) => {
  return genericDelete(`${Global.contentUrl}/api/Section?id=${sectionId}`);
};
