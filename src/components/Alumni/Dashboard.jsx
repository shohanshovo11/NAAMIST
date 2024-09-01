import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import PleaseSignInFirst from "../Common/PleaseSignInFirst";

const AlumniDashboard = () => {
  const isAuthenticated = useAuthUser();

  return isAuthenticated ? <div>AlumniDashboard</div> : <PleaseSignInFirst />;
};

export default AlumniDashboard;
