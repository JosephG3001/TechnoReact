import { useSelector } from "react-redux";
import { selectError } from "../../redux/reducers/error.reducer";

const ErrorPage = () => {
  const error = useSelector(selectError);

  return (
    <div className="center">
      <i className="fas fa-frown" />
      <h1>Error Occured</h1>
      <p>{error}</p>
      <a href="/">Go to homepage</a>
    </div>
  );
};

export default ErrorPage;
