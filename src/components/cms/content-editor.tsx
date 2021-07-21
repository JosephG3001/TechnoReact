import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { postArticle, putArticle } from "../../api/article-service";
import ArticleEntity from "../../classes/article-entity";
import Section from "../../classes/section";
import InputRichtextEditor from "../../inputs/input-richtext-editor";
import InputSingleSelect from "../../inputs/input-single-select";
import InputTextBox from "../../inputs/input-textbox";
import InputToggleSwitch from "../../inputs/input-toggle-switch";
import TechnoButton from "../../inputs/techno-button";
import { loadedArticle } from "../../redux/reducers/article.reducer";
import addArticleToRedux from "../../redux/reducers/section-thunks/add-article-to-redux";
import updateArticleInRedux from "../../redux/reducers/section-thunks/update-article-in-redux";
import {
  selectSection,
  selectSections,
} from "../../redux/reducers/sections.reducer";
import setServerSideFormErrors from "../../tools/formUtils";
import nameof from "../../tools/nameof";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../tools/toast";

const StyledContentEditor = styled.div`
  display: flex;
  flex: 1;

  form {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    flex: 1;
  }

  .article-form {
    flex: 0;
  }

  .article-content-wrapper {
    flex: 1;
    display: flex;
    margin-bottom: 15px;

    > div,
    .mce-tinymce.mce-container.mce-panel {
      flex: 1;
      height: 100%;
      /* height: calc(100vh - 290px);
      max-height: calc(100vh - 290px); */

      .mce-container-body.mce-stack-layout {
        height: 100%;
        display: flex;
        flex-direction: column;

        .mce-edit-area.mce-container.mce-panel.mce-stack-layout-item {
          flex: 1;
        }

        iframe {
          height: 100% !important;
          min-height: 100% !important;
        }
      }
    }
  }

  .article-footer,
  .article-header {
    flex: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button,
    .custom-switch {
      margin-left: 15px;
    }
  }
`;

interface IContentEditorProps {
  articleForEdit: ArticleEntity;
}

const ContentEditor: React.FC<IContentEditorProps> = ({ articleForEdit }) => {
  const dispatch = useDispatch();
  const section = useSelector(selectSection(articleForEdit?.sectionId));
  const techs = useSelector(selectSections);
  const [darkMode, setDarkMode] = useState(false);
  const [tech, setTech] = useState<Section>();
  const [html, setHtml] = useState<string>(articleForEdit.articleHtml);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (section) {
      setTech(techs.find((t) => t.sectionId === section.parentSectionId));
    }
  }, [section, techs]);

  const form = useForm<ArticleEntity>({
    defaultValues: articleForEdit,
  });

  const { handleSubmit, clearErrors, setValue, register, errors, reset } = form;

  useEffect(() => {
    setHtml(articleForEdit.articleHtml);
    reset(articleForEdit);
  }, [reset, articleForEdit]);

  const onSubmit = (data: ArticleEntity) => {
    setSaving(true);
    const localArticle: ArticleEntity = { ...data, articleHtml: html || "" };
    if (!data.articleId) {
      postArticle(localArticle)
        .then((result) => {
          if (result.success) {
            localArticle.articleId = result.model;
            dispatch(addArticleToRedux(localArticle));
            dispatch(loadedArticle({ ...articleForEdit, ...localArticle }));
            showSuccessToast("Successfully added the article");
          } else {
            setServerSideFormErrors(form, result.errors);
            showWarningToast("Please correct the form errors");
          }
          setSaving(false);
        })
        .catch((error) => {
          showErrorToast(`Failed to save article: ${error}`);
        });
    } else {
      putArticle(localArticle)
        .then((result) => {
          if (result.success) {
            dispatch(updateArticleInRedux(localArticle));
            showSuccessToast("Successfully updated the article");
          } else {
            setServerSideFormErrors(form, result.errors);
            showWarningToast("Please correct the form errors");
          }
          setSaving(false);
        })
        .catch((error) => {
          showErrorToast(`Failed to update article: ${error}`);
        });
    }
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
          <Controller
            name={nameof<ArticleEntity>("articleId")}
            render={({ name, value }) => (
              <input type="hidden" value={value} name={name} />
            )}
          />
          <div className="article-header">
            <Controller
              name={nameof<ArticleEntity>("visible")}
              render={({ name, onChange, value }) => (
                <InputToggleSwitch
                  label="Active"
                  value={value}
                  name={name}
                  onChange={onChange}
                />
              )}
            />

            <TechnoButton
              materialIcon="save"
              saving={saving}
              isSubmitButton
              text={`${articleForEdit.articleId ? "Update" : "Save"} Article`}
            />
          </div>
          <hr />
          <div className="article-form row">
            <div className="col-4">
              {tech && (
                <InputSingleSelect
                  label="Tech"
                  name="Tech"
                  items={techs}
                  isDisabled={!!articleForEdit.articleId}
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
                    isDisabled={!!articleForEdit.articleId}
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
                error={errors.articleName?.message}
              />
            </div>
          </div>
          <div className="article-content-wrapper">
            <InputRichtextEditor
              editorKey={articleForEdit.articleId}
              initialValue={articleForEdit.articleHtml}
              onChange={(e) => {
                setHtml(e);
              }}
              darkMode={darkMode}
            />
          </div>
          <div className="article-footer">
            <InputToggleSwitch
              label="Toggle Dark Mode"
              value={darkMode}
              onChange={(e) => {
                setDarkMode(e);
              }}
            />
          </div>
        </form>
      </FormProvider>
    </StyledContentEditor>
  );
};

export default ContentEditor;
