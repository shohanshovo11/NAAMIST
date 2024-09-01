// useTokenValidation.js
import { useState, useEffect } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const useTokenValidation = (role) => {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const token = auth?.token;
  
  //wait for five second here


  useEffect(() => {
    const validateToken = async () => {
      if (!isAuthenticated || !token) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      try {
        // Split token into parts
        const [, payload] = token.split('.');
        if (!payload) {
          setIsValid(false);
          setIsLoading(false);
          return;
        }

        // Decode the payload from base64
        const decodedPayload = atob(payload);
        const { exp, role: tokenRole } = JSON.parse(decodedPayload);
        if (!exp || exp < Date.now() / 1000 || (role && tokenRole !== role)) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      } catch (error) {
        setIsValid(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, [isAuthenticated, token, role]);

  return { isValid, isLoading };
};

export default useTokenValidation;
