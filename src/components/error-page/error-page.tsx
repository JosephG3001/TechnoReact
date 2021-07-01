import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectError } from "../../redux/reducers/error.reducer";
import BackgroundImage from "../backgroundImage";

const StyledErrorPage = styled.div`
  .center {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; /*centers items on the line (the x-axis by default)*/
    align-items: center; /*centers items on the cross-axis (y by default)*/
    flex-direction: column;
    left: 0;
    top: 0;

    h1 {
      color: ${({ theme }) => theme.pallet.themeColour1};
      font-size: 3em;
      padding: 15px;
    }

    p {
      color: ${({ theme }) => theme.pallet.errorTextColour};
    }

    .fas {
      font-size: 4em;
      color: ${({ theme }) => theme.pallet.themeColour1};
    }
  }
`;

const ErrorPage = () => {
  const error = useSelector(selectError);

  return (
    <StyledErrorPage>
      <BackgroundImage />
      <div className="center">
        <i className="fas fa-frown" />
        <h1>Error Occured</h1>
        <p>{error}</p>
        <a className="btn btn-primary" href="/">
          Go to homepage
        </a>
      </div>
    </StyledErrorPage>
  );
};

export default ErrorPage;
