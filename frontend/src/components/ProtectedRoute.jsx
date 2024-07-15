import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserFromLocalStorage } from "../utils/localStorage";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.userState);
  const localStorageUser = getUserFromLocalStorage();
  if (!user || !localStorageUser) {
    alert("You need to login first");
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
