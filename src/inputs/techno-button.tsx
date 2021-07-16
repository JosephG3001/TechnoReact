import { CircularProgress } from "@material-ui/core";
import { FC } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledTechnoButton = styled.div`
  button {
    padding: 3px 7px;
    vertical-align: middle;
    display: flex;
    align-items: center;

    .material-icons {
      padding: 3px;
      vertical-align: middle;
    }

    span {
      padding: 3px;
      vertical-align: middle;
    }

    .MuiCircularProgress-root {
      color: ${({ theme }) => theme.pallet.foregroundColour1};
      height: 20px !important;
      width: 20px !important;
    }
  }
`;

interface ITechnoButtonButtonProps {
  text: string;
  materialIcon?: string;
  isSubmitButton?: boolean;
  saving?: boolean;
  onClick?: () => void;
}

const TechnoButton: FC<ITechnoButtonButtonProps> = ({
  text,
  materialIcon,
  isSubmitButton,
  saving,
  onClick,
}) => {
  return (
    <StyledTechnoButton>
      <Button
        disabled={saving}
        type={isSubmitButton ? "submit" : "button"}
        onClick={() => (onClick ? onClick() : undefined)}
      >
        {saving && <CircularProgress color="secondary" />}
        {!saving && materialIcon && (
          <i className="material-icons">{materialIcon}</i>
        )}
        <span>{text}</span>
      </Button>
    </StyledTechnoButton>
  );
};

export default TechnoButton;
