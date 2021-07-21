import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../../../../api/article-service";
import withModal from "../../../../hocs/withModal";
import TechnoButton from "../../../../inputs/techno-button";
import {
  clearArticle,
  selectArticleForEdit,
} from "../../../../redux/reducers/article.reducer";
import removeArticleFromRedux from "../../../../redux/reducers/section-thunks/remove-article-from-redux";
import { StyledModalFooter } from "../../../../styles";
import { showSuccessToast } from "../../../../tools/toast";

export interface IDeleteArticleModalProps {
  articleId: string;
  closeModal: () => void;
}

const DeleteArticleModal: FC<IDeleteArticleModalProps> = ({
  articleId,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const articleForEdit = useSelector(selectArticleForEdit);

  const onDeleteClick = () => {
    deleteArticle(articleId).then((result) => {
      if (result.success) {
        closeModal();
        showSuccessToast("Successfully deleted the record");

        if (articleId === articleForEdit?.articleId) {
          dispatch(clearArticle());
        }
        dispatch(removeArticleFromRedux(articleId));
      }
    });
  };

  return (
    <div>
      <p>Are you sure you want to delete the record?</p>
      <StyledModalFooter>
        <TechnoButton
          materialIcon="close"
          text="Cancel"
          onClick={() => closeModal()}
        />
        <TechnoButton
          materialIcon="save"
          text="Delete"
          onClick={() => onDeleteClick()}
        />
      </StyledModalFooter>
    </div>
  );
};

export default withModal(DeleteArticleModal);
