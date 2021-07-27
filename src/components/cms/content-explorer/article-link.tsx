/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { FC, useState } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ArticleListItem from "../../../classes/article-list-item";
import { loadArticle } from "../../../redux/reducers/article.reducer";
import DeleteArticleModal from "./modals/delete-article-modal";

const StyledArticleLink = styled.div`
  .link {
    &.disabled {
      color: ${({ theme }) => theme.pallet.disabledArticleColor};

      .material-icons {
        color: ${({ theme }) => theme.pallet.disabledArticleColor};
      }
    }
  }
`;

const ArticleLink: FC<ArticleListItem> = ({
  articleName,
  articleId,
  visible,
}) => {
  const dispatch = useDispatch();

  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState(false);

  return (
    <StyledArticleLink>
      <div
        className={`link ${visible ? "" : "disabled"}`}
        role="button"
        onClick={() => dispatch(loadArticle(articleId))}
      >
        {visible ? (
          <i className="material-icons article-link">insert_drive_file</i>
        ) : (
          <i className="material-icons article-link">no_accounts</i>
        )}

        <ContextMenuTrigger id={`ContextMenu_Article_${articleId}`}>
          <span>{articleName}</span>
        </ContextMenuTrigger>
      </div>
      <ContextMenu id={`ContextMenu_Article_${articleId}`}>
        <MenuItem onClick={() => setShowDeleteArticleModal(true)}>
          Delete Article
        </MenuItem>
      </ContextMenu>

      <DeleteArticleModal
        articleId={articleId}
        closeModal={() => setShowDeleteArticleModal(false)}
        showModal={showDeleteArticleModal}
        onClose={() => setShowDeleteArticleModal(false)}
      />
    </StyledArticleLink>
  );
};

export default ArticleLink;
