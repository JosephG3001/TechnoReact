import Section from "../classes/section";
import { showErrorToast } from "../tools/toast";


export function loadSectionsFromApi(): Promise<Section[]> {    
    return fetch("http://api.technolibrary.co.uk/api/Section").then(result => result.json())
    .then((result: Section[]) => {     
      return result;
    }).catch((error: string) => {
      showErrorToast(error);  
      return [];
    });
  }