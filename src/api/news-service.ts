import NewsEntity from "../classes/news-entity";
import { Global } from "../techno.config";
import { genericGet } from "./apiUtils";

export const loadNewsFromApi = (): Promise<NewsEntity[]> => {
  return genericGet<NewsEntity[]>(
    `${Global.newsUrl}/api/News?page=1&showcount=100`
  );

  // return fetch(`${Global.apiUrl}/api/News?page=1&showcount=100`)
  // .then(result => result.json())
  // .then((result: NewsEntity[]) => {
  //     return result;
  // }).catch((error: string) => {
  //     showErrorToast(error);
  //     return [];
  // });
};

export const saveNews = () => {};
