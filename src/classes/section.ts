import ArticleListItem from "./article-list-item";

export default class Section {
  sectionId: string;

  parentSectionId: string | null;

  parentSectionName: string | null;

  inverseParentSection: Array<Section>;

  sectionName: string;

  displayOrder: number;

  icon: string;

  articleList: Array<ArticleListItem>;

  visible: boolean;
}
