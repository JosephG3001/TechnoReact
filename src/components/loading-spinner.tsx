import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const StyledloadingSpinner = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.pallet.foregroundColour1};

  .spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }

  .mat-spinner {
    width: ${({ theme }) => theme.metrics.spinnerSize} !important;
    height: ${({ theme }) => theme.metrics.spinnerSize} !important;
  }
`;

interface ILoadingSpinnerProps {
  labelText: string;
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ labelText }) => {
  return (
    <StyledloadingSpinner>
      <div className="spinner-container">
        <CircularProgress className="mat-spinner" />
        <h1>{labelText}</h1>
      </div>
    </StyledloadingSpinner>
  );
};

export default LoadingSpinner;
