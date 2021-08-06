import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

interface IStyledloadingSpinnerProps {
  largeText: boolean;
}

const StyledloadingSpinner = styled.div<IStyledloadingSpinnerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.pallet.foregroundColour1};

  .spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;

    h1 {
      font-size: ${(props) => (props.largeText ? "2em" : "1em")};
    }
  }

  .mat-spinner {
    width: ${({ theme }) => theme.metrics.spinnerSize} !important;
    height: ${({ theme }) => theme.metrics.spinnerSize} !important;
    color: ${({ theme }) => theme.pallet.themeColour1} !important;
  }
`;

interface ILoadingSpinnerProps {
  labelText: string;
  largeText: boolean;
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  labelText,
  largeText,
}) => {
  return (
    <StyledloadingSpinner largeText={largeText}>
      <div className="spinner-container">
        <CircularProgress className="mat-spinner" />
        <h1>{labelText}</h1>
      </div>
    </StyledloadingSpinner>
  );
};

export default LoadingSpinner;
