import React from "react";
import styled from "styled-components";
import News from "../news/news";

const StyledLandingPage = styled.div`
  .header-wrapper {
    text-align: center;
    color: ${({ theme }) => theme.pallet.foregroundColour1};
    padding: 35px 25px;

    h1 {
      font-size: 3em;
    }

    h2 {
      font-size: 2em;
      color: ${({ theme }) => theme.pallet.themeColour1};
    }
  }
`;

export const LandingPage: React.FC = () => {
  return (
    <StyledLandingPage>
      <div className="header-wrapper">
        <h1>Technolibrary React Version</h1>
        <h2>Programming CMS</h2>
      </div>
      <News />
    </StyledLandingPage>
  );
};

export default LandingPage;
