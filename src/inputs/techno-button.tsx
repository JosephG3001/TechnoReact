import { FC } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledTechnoButton = styled.div`
  button {
    padding: 3px 7px;
    vertical-align: middle;

    .material-icons {
      padding: 3px;
      vertical-align: middle;
    }

    span {
      padding: 3px;
      vertical-align: middle;
    }
  }
`;

interface ITechnoButtonButtonProps {
  text: string;
  materialIcon?: string;
  isSubmitButton?: boolean;
  onClick?: () => void;
}

const TechnoButton: FC<ITechnoButtonButtonProps> = ({
  text,
  materialIcon,
  isSubmitButton,
  onClick,
}) => {
  return (
    <StyledTechnoButton>
      <Button
        type={isSubmitButton ? "submit" : "button"}
        onClick={() => (onClick ? onClick() : undefined)}
      >
        {materialIcon && <i className="material-icons">{materialIcon}</i>}
        <span>{text}</span>
      </Button>
    </StyledTechnoButton>
  );
};

export default TechnoButton;
