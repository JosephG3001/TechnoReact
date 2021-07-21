/* eslint-disable @typescript-eslint/no-unused-vars */
import { Editor } from "@tinymce/tinymce-react";
import { FC } from "react";
import styled from "styled-components";
import { postFileFormData } from "../api/apiUtils";
import FileStoreResult from "../classes/fileStoreResult";
import { Global } from "../techno.config";

interface IStyledInputRichtextEditorProps {
  darkMode: boolean;
}

const StyledInputRichtextEditor = styled.div<IStyledInputRichtextEditorProps>`
  .rdw-editor-toolbar {
    color: ${(props) => (props.darkMode ? "#fff" : "#000")};
    background-color: ${(props) => (props.darkMode ? "#888" : "#eee")};
    border-color: ${(props) => (props.darkMode ? "#999" : "#eee")} !important;

    .rdw-option-wrapper {
      color: ${(props) => (props.darkMode ? "#fff" : "#000")};
      background-color: ${(props) => (props.darkMode ? "#888" : "#eee")};
      border-color: ${(props) => (props.darkMode ? "#999" : "#eee")} !important;
    }

    .rdw-dropdown-selectedtext {
      color: ${(props) => (props.darkMode ? "#fff" : "#000")};
      background-color: ${(props) => (props.darkMode ? "#888" : "#eee")};
      border-color: ${(props) => (props.darkMode ? "#999" : "#eee")} !important;
    }
  }

  .rdw-editor-main {
    color: ${(props) => (props.darkMode ? "#fff" : "#000")};
    background-color: ${(props) => (props.darkMode ? "#444" : "#eee")};
    height: calc(100vh - 370px);
    overflow-y: auto;

    .DraftEditor-root {
    }
  }
`;

interface IInputRichtextEditorProps {
  initialValue: string;
  darkMode?: boolean;
  onChange: (value: string) => void;
  editorKey: string;
}

const InputRichtextEditor: FC<IInputRichtextEditorProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialValue,
  onChange,
  darkMode,
  editorKey,
}) => {
  // const tinyRef = useRef<Editor>(null);

  const fileUploadHandler = (blobInfo, success, failure, progress) => {
    postFileFormData(`${Global.fileStoreUrl}/api/file`, blobInfo).then(
      (result: FileStoreResult) => {
        if (!result.success) {
          failure(result.errorMessage);
        }
        const imageLocation = `${
          window.location.origin
        }/images/${blobInfo.filename()}`;
        success(imageLocation);
      }
    );
  };

  // useEffect(() => {
  //   debugger;
  //   tinyRef?.current?.editor?.setContent(initialValue);
  // }, [initialValue]);

  return (
    <StyledInputRichtextEditor darkMode={darkMode ?? false}>
      <Editor
        key={editorKey}
        // ref={tinyRef}
        initialValue={initialValue}
        tinymceScriptSrc={`${process.env.PUBLIC_URL}/content/tinymce/tinymce.min.js`}
        onEditorChange={(e) => {
          onChange(e);
        }}
        init={{
          height: 500,
          menubar: true,
          content_css: "oxidedark",
          codesample_global_prismjs: true,
          // file_picker_callback: filePickerCallback,
          // images_upload_url: `${Global.fileStoreUrl}/api/file`,
          images_upload_handler: fileUploadHandler,
          codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
            { text: "CSS", value: "css" },
            { text: "PHP", value: "php" },
            { text: "Ruby", value: "ruby" },
            { text: "Python", value: "python" },
            { text: "Java", value: "java" },
            { text: "C", value: "c" },
            { text: "C#", value: "csharp" },
            { text: "C++", value: "cpp" },
            { text: "VB.Net", value: "vbnet" },
            { text: "SQL", value: "sql" },
          ],
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "codesample",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | " +
            "image | " +
            "codesample code",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </StyledInputRichtextEditor>
  );
};

export default InputRichtextEditor;
