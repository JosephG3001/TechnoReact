import React from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  .content-container {
    color: $foreground-colour1;
    display: flex;

    .content-menu {
      flex: 1;
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour1};
      margin: 15px;
      padding: 15px;
    }

    .content-editor {
      flex: 2;
      background-color: ${({ theme }) => theme.pallet.sidebarBackgroundColour1};
      margin: 15px;
      padding: 15px;
    }
  }
`;

const Content: React.FC = () => {
  return (
    <StyledContent>
      <div className="content-container">
        <div className="content-menu">Content Explorer</div>
        <div className="content-editor">Content Editor</div>
      </div>
    </StyledContent>
  );
};

export default Content;
