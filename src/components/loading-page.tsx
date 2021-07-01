import { FC } from "react";
import styled from "styled-components";
import BackgroundImage from "./backgroundImage";
import LoadingSpinner from "./loading-spinner";

const StyledLoadingPage = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.pallet.foregroundColour1};
`;

interface ILoadingPageProps {
  labelText: string;
}

const LoadingPage: FC<ILoadingPageProps> = ({ labelText }) => {
  return (
    <StyledLoadingPage>
      <BackgroundImage />
      <LoadingSpinner largeText labelText={labelText} />
    </StyledLoadingPage>
  );
};

export default LoadingPage;
