import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ArticleEntity from "../../classes/article-entity";
import Section from "../../classes/section";
import InputRichtextEditor from "../../inputs/input-richtext-editor";
import InputSingleSelect from "../../inputs/input-single-select";
import InputTextBox from "../../inputs/input-textbox";
import TechnoButton from "../../inputs/techno-button";
import {
  selectSection,
  selectSections,
} from "../../redux/reducers/sections.reducer";
import nameof from "../../tools/nameof";

const StyledContentEditor = styled.div`
  display: flex;
  flex: 1;

  form {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    flex: 1;
  }

  .article-form-controls {
    flex: 0;
  }

  .article-content-wrapper {
    flex: 1;
    .ck-editor__editable {
      height: calc(100vh - 328px);
    }
  }

  .article-footer-buttons {
    flex: 0;
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: 15px;
    }
  }
`;

interface IContentEditorProps {
  articleForEdit: ArticleEntity;
}

const ContentEditor: React.FC<IContentEditorProps> = ({ articleForEdit }) => {
  const section = useSelector(selectSection(articleForEdit?.sectionId));
  const techs = useSelector(selectSections);

  const [tech, setTech] = useState<Section>();

  useEffect(() => {
    if (section) {
      setTech(techs.find((t) => t.sectionId === section.parentSectionId));
    }
  }, [section, techs]);

  const form = useForm<ArticleEntity>({
    defaultValues: articleForEdit,
  });

  const { handleSubmit, clearErrors, setValue, register } = form;

  const onSubmit = (data: ArticleEntity) => {
    console.log(data);
  };

  return (
    <StyledContentEditor>
      <FormProvider {...form}>
        <form
          onSubmit={(e) => {
            clearErrors();
            handleSubmit(onSubmit)(e);
          }}
        >
          <div className="article-form-controls row">
            <div className="col-4">
              {tech && (
                <InputSingleSelect
                  label="Tech"
                  name="Tech"
                  items={techs}
                  value={tech.sectionId}
                  textProperty={nameof<Section>("sectionName")}
                  valueProperty={nameof<Section>("sectionId")}
                  onChange={(value: string) => {
                    const localTech = techs.find((t) => t.sectionId === value);
                    setTech(localTech);
                    setValue(
                      "sectionId",
                      localTech?.inverseParentSection[0]?.sectionId
                    );
                  }}
                />
              )}
            </div>
            <div className="col-4">
              <Controller
                name={nameof<ArticleEntity>("sectionId")}
                render={({ name, onChange, value }) => (
                  <InputSingleSelect
                    label="Section"
                    name={name}
                    items={tech?.inverseParentSection || []}
                    value={value}
                    textProperty={nameof<Section>("sectionName")}
                    valueProperty={nameof<Section>("sectionId")}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div className="col-4">
              <InputTextBox
                ref={register}
                label="Article Name *"
                name={nameof<ArticleEntity>("articleName")}
              />
            </div>
          </div>
          <div className="article-content-wrapper">
            <Controller
              defaultValue={articleForEdit.articleHtml}
              name={nameof<ArticleEntity>("articleHtml")}
              render={({ name, onChange, value }) => (
                <InputRichtextEditor
                  value={value}
                  name={name}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="article-footer-buttons">
            <TechnoButton
              materialIcon="close"
              text="Cancel"
              onClick={() => {}}
            />
            <TechnoButton
              materialIcon="save"
              isSubmitButton
              text={`${articleForEdit.articleId ? "Update" : "Save"} Article`}
            />
          </div>
        </form>
      </FormProvider>
    </StyledContentEditor>
  );
};

export default ContentEditor;
