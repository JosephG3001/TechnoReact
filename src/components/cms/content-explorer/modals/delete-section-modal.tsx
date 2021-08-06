import { FC } from "react";
import { useDispatch } from "react-redux";
import { deleteSection } from "../../../../api/sections-service";
import withModal from "../../../../hocs/withModal";
import TechnoButton from "../../../../inputs/techno-button";
import removeSectionFromRedux from "../../../../redux/reducers/section-thunks/remove-section-from-redux";
import { StyledModalFooter } from "../../../../styles";
import { showSuccessToast } from "../../../../tools/toast";

export interface IDeleteSectionModalProps {
  sectionId: string;
  closeModal: () => void;
}

const DeleteSectionModal: FC<IDeleteSectionModalProps> = ({
  sectionId,
  closeModal,
}) => {
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    deleteSection(sectionId).then((result) => {
      if (result.success) {
        closeModal();
        showSuccessToast("Successfully deleted the record");
        dispatch(removeSectionFromRedux(sectionId));
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

export default withModal(DeleteSectionModal);
