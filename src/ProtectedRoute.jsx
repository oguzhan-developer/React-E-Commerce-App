import { useSelector } from "react-redux";
import { useGetUserIsLoading, useUser } from "./redux/userSlice";

function ProtectedRoute({ children }) {
  const user = useSelector(useUser);
  const isLoading = useSelector(useGetUserIsLoading);

  if (!isLoading && user) return children;
  else {
    return "Giriş yapılması gerekiyor!";
  }
}

export default ProtectedRoute;
