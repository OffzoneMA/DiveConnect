import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.userState);

  if (!user) {
    alert("You need to login first");
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
