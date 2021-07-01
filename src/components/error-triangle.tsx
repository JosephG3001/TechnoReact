import { FC } from "react";
import styled from "styled-components";

const StyledErrorTriangle = styled.div`
  .error-container {
    text-align: center;
    color: ${({ theme }) => theme.pallet.foregroundColour1};

    .fas {
      font-size: 5em;
      color: ${({ theme }) => theme.pallet.themeColour2};
      margin: 15px;
    }
  }
`;

interface IErrorTriagleProps {
  labelText: string;
}

const ErrorTriangle: FC<IErrorTriagleProps> = ({ labelText }) => {
  return (
    <StyledErrorTriangle>
      <div className="error-container">
        <i className="fas fa-exclamation-triangle" />
        <div>{labelText}</div>
      </div>
    </StyledErrorTriangle>
  );
};

export default ErrorTriangle;
