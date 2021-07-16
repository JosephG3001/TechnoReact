/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postSection, putSection } from "../../api/sections-service";
import Section from "../../classes/section";
import withModal from "../../hocs/withModal";
import InputTextBox from "../../inputs/input-textbox";
import TechnoButton from "../../inputs/techno-button";
import addSectionToRedux from "../../redux/reducers/section-thunks/add-section-to-redux";
import updateSectionInRedux from "../../redux/reducers/section-thunks/update-section-in-redux";
import { selectSection } from "../../redux/reducers/sections.reducer";
import { StyledModalFooter } from "../../styles";
import setServerSideFormErrors from "../../tools/formUtils";
import nameof from "../../tools/nameof";
import { showErrorToast, showSuccessToast } from "../../tools/toast";

class AddEditSectionDto {
  recordId: string;

  recordName: string;
}

export enum EMenuEntityType {
  Tech,
  Subsection,
}

export interface IAddEditModalProps {
  recordId: string;
  recordName: string;
  parentSectionId?: string | undefined;
  entityType: EMenuEntityType;
  closeModal: () => void;
}

const AddEditSectionModal: React.FC<IAddEditModalProps> = ({
  recordId,
  recordName,
  parentSectionId,
  entityType,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const section = useSelector(selectSection(recordId));

  const defaultDto = useMemo<AddEditSectionDto>(() => {
    return {
      recordId,
      recordName,
    };
  }, [recordId, recordName]);

  const textBoxLabel = useMemo(() => {
    const addOrEdit = recordId === "" ? "New" : "Rename";
    return `${addOrEdit} ${EMenuEntityType[entityType]}*`;
  }, [recordId, entityType]);

  const form = useForm<AddEditSectionDto>({ defaultValues: defaultDto });
  const { handleSubmit, clearErrors, reset, watch, register, errors } = form;
  const [saving, setSaving] = useState(false);

  const onSubmit = (data: AddEditSectionDto) => {
    setSaving(true);
    if (section && recordId) {
      putSection({
        ...section,
        sectionName: data.recordName,
      })
        .then((result) => {
          if (result.success) {
            showSuccessToast(
              `Successfully updated the ${EMenuEntityType[entityType]} ${data.recordName}`
            );
            dispatch(
              updateSectionInRedux({
                ...section,
                sectionName: data.recordName,
              })
            );
            closeModal();
          }
          setSaving(false);
        })
        .catch((err) => {
          showErrorToast(`Error occured: ${err}`);
          setSaving(false);
        });
    } else {
      const newSection = new Section();
      newSection.sectionName = data.recordName;
      newSection.visible = true;
      newSection.inverseParentSection = [];
      newSection.articleList = [];
      newSection.parentSectionId = null;
      newSection.parentSectionName = null;
      if (parentSectionId && parentSectionId !== "Root") {
        newSection.parentSectionId = parentSectionId;
      }

      postSection(newSection)
        .then((result) => {
          if (result.success) {
            showSuccessToast(
              `Successfully added the ${EMenuEntityType[entityType]} ${data.recordName}`
            );
            newSection.sectionId = result.model.sectionId;
            newSection.displayOrder = result.model.displayOrder;
            dispatch(addSectionToRedux(newSection));
            closeModal();
          } else {
            setServerSideFormErrors(form, [
              ...result.errors.map((err) => {
                return {
                  propertyName:
                    err.propertyName === "sectionName"
                      ? "recordName"
                      : err.propertyName,
                  errors: err.errors,
                };
              }),
            ]);
          }
          setSaving(false);
        })
        .catch((err) => {
          showErrorToast(`Error occured: ${err}`);
          setSaving(false);
        });
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={(e) => {
            clearErrors();
            handleSubmit(onSubmit)(e);
          }}
        >
          <input
            ref={register}
            type="hidden"
            name={nameof<AddEditSectionDto>("recordId")}
          />

          <InputTextBox
            label={textBoxLabel}
            horizontalLabel
            name={nameof<AddEditSectionDto>("recordName")}
            ref={register}
            error={errors.recordName?.message}
          />

          <StyledModalFooter>
            <TechnoButton
              materialIcon="close"
              text="Cancel"
              onClick={() => closeModal()}
            />
            <TechnoButton
              materialIcon="save"
              isSubmitButton
              saving={saving}
              text={`Save ${EMenuEntityType[entityType]}`}
            />
          </StyledModalFooter>
        </form>
      </FormProvider>
    </div>
  );
};

export default withModal(AddEditSectionModal);
