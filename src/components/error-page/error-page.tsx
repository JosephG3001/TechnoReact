import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectError } from "../../redux/reducers/error.reducer";

const StyledErrorPage = styled.div`
  .center {
    text-align: center;
  }
`;

const ErrorPage = () => {
  const error = useSelector(selectError);

  return (
    <StyledErrorPage>
      <div className="center">
        <i className="fas fa-frown" />
        <h1>Error Occured</h1>
        <p>{error}</p>
        <a href="/">Go to homepage</a>
      </div>
    </StyledErrorPage>
  );
};

export default ErrorPage;
