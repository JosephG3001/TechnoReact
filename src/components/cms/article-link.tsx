import { FC } from "react";
import ArticleListItem from "../../classes/article-list-item";

const ArticleLink: FC<ArticleListItem> = ({ articleName }) => {
  return (
    <div className="link">
      <i className="material-icons article-link">insert_drive_file</i>
      <span>{articleName}</span>
    </div>
  );
};

export default ArticleLink;
