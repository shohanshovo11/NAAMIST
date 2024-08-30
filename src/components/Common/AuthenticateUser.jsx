import { Navigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const AuthenticateUser = ({ role, children }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const token = auth?.token;

  // Helper function to decode JWT token and check if it is expired
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      // Split token into parts
      const [, payload] = token.split('.');
      if (!payload) return true;

      // Decode the payload from base64
      const decodedPayload = atob(payload);
      const { exp, role: tokenRole } = JSON.parse(decodedPayload);
      if (!exp) return true;

      const now = Date.now() / 1000; // Current time in seconds

      return exp < now || (role && tokenRole !== role); // Check if token is expired or role does not match
    } catch (error) {
      return true; // Consider the token expired in case of any error
    }
  };

  // Redirect to login if not authenticated or token is expired
  if (!isAuthenticated || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if the user's role does not match the required role
  if (role && !auth.role.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthenticateUser;
