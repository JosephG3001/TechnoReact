import NewsEntity from "../classes/news-entity";
import { showErrorToast } from "../tools/toast";


export function loadNewsFromApi(): Promise<NewsEntity[]>  {    
    return fetch("http://api.technolibrary.co.uk/api/News?page=1&showcount=100")
    .then(result => result.json())
    .then((result: NewsEntity[]) => { 
        return result;
    }).catch((error: string) => {
        showErrorToast(error);
        return [];
    });
  }