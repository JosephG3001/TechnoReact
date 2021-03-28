import React from "react";
import styled from "styled-components";

const StyledMy404Page = styled.div`
  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    color: ${({ theme }) => theme.pallet.foregroundColour1};

    .fas {
      font-size: 4em;
    }
  }
`;

const My404Page: React.FC = () => {
  return (
    <StyledMy404Page>
      <div className="center">
        <i className="fas fa-frown" />
        <h1>404 Not found</h1>
        <p>The page you are looking for does not exist</p>
        <a href="/">Go to homepage</a>
      </div>
    </StyledMy404Page>
  );
};

export default My404Page;
