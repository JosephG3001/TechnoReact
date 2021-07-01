import styled from "styled-components";
import milkyway from "../images/milkyway.jpg";

const StyledBackgroundImage = styled.div`
  position: fixed;
  z-index: -9999;
  top: 0;
  min-height: 100%;
  width: 100%;
  background-image: url(${milkyway});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .glass {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.pallet.glassBackgroundColour};
  }
`;

const BackgroundImage = () => {
  return (
    <StyledBackgroundImage>
      <div className="glass" />
    </StyledBackgroundImage>
  );
};

export default BackgroundImage;
