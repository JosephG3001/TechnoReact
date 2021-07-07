import { FC } from "react";
import styled from "styled-components";

const StyledInputRichtextEditor = styled.div`
  overflow-x: hidden;

  .ck_content {
    background-color: #000 !important;
  }
`;

interface IInputRichtextEditorProps {
  name: string;
  value: string;
  onChange: (newValue: string) => void;
}

const InputRichtextEditor: FC<IInputRichtextEditorProps> = ({
  name,
  value,
  onChange,
}) => {
  // ClassicEditor.contentsCss = ["/css/ckeditor-contents.css"];

  return (
    <StyledInputRichtextEditor>
      <html lang="en">
        <body>
          <CKEditor
            id={name}
            name={name}
            editor={ClassicEditor}
            config={{
              contentsCss: ["/css/ckeditor-contents.css"],
              allowedContent: true,
              format_tags: "p;h1;h2;h3;pre",
              extraPlugins: "CodeBlock",
            }}
            data={value}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
              // editor.config.allowedContent = true;
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </body>
      </html>
    </StyledInputRichtextEditor>
  );
};

export default InputRichtextEditor;
