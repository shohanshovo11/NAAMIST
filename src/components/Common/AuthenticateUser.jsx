import { Navigate } from "react-router-dom";
import useTokenValidation from "../../utils/hooks/useTokenValidation";

const AuthenticateUser = ({ role, children }) => {
  const { isValid, isLoading } = useTokenValidation(role);

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner/loader component
  }

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  // if (role && !auth.role.includes(role)) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default AuthenticateUser;
