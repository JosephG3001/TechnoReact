import ArticleEntity from "../classes/article-entity";
import { showErrorToast } from "../tools/toast";


 export function loadArticlesFromApi(subSectionId: string): Promise<ArticleEntity[]> {
    return fetch(`http://api.technolibrary.co.uk/api/articles?id=${subSectionId}`)
    .then(result => result.json())
    .then((result: ArticleEntity[]) => {       
        result = result.filter(a => a.visible);
        return result;
    }).catch((error: string) => {
           showErrorToast(error);        
        return [];
    });
  }