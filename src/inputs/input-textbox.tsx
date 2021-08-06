import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledInputTextBox = styled.div`
  input[type="text"] {
    background-color: ${({ theme }) =>
      theme.pallet.formControlBackgroundColour};
    color: ${({ theme }) => theme.pallet.formControlTextColourColour};
    border-color: ${({ theme }) => theme.pallet.formControlBoxColour};

    &:focus {
      border-color: ${({ theme }) => theme.pallet.formControlBoxSelectedColour};
      box-shadow: none !important;
    }
  }
`;

interface IInputTextBoxProps {
  name: string;
  label: string;
  error?: string;
  horizontalLabel?: boolean;
  onChange?: (newValue: string) => void;
}

const InputTextBox = forwardRef<HTMLInputElement, IInputTextBoxProps>(
  ({ name, label, error, onChange, horizontalLabel }, ref) => {
    const handleTextboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (onChange) {
        onChange(event.target.value);
      }
    };

    return (
      <StyledInputTextBox>
        <div className={`form-group ${horizontalLabel ? "row" : ""}`}>
          <label
            className={horizontalLabel ? "col-sm-4 col-form-label" : ""}
            htmlFor={name}
          >
            {label}
          </label>
          <div className={horizontalLabel ? "col-sm-8" : ""}>
            <input
              type="text"
              className={`${error ? "error" : ""} form-control`}
              ref={ref}
              name={name}
              onChange={ref == null ? handleTextboxChange : undefined}
            />
            {error && <label className="error-label">{error}</label>}
          </div>
        </div>
      </StyledInputTextBox>
    );
  }
);

export default InputTextBox;
