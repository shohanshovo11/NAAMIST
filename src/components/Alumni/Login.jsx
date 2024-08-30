import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Axios from '../../utils/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate(); // Initialize useNavigate

  const loginHandler = async () => {
    try {
      // Make the POST request to login
      const response = await Axios.post('/auth/login', { email, password, role: 'alumni' });

      // Extract token and role from response
      const { token, role, user } = response.data;
      // Use `signIn` to store the token in a cookie
      const success = signIn({
        token,
        auth: {
          token: token,
          type: 'Bearer',
        },
        userState: {
          id: user?._id,
          role: role,
          token: token
        }
      });

      if (success) {
        console.log('Successfully signed in!');
        // Navigate based on role
        if (role === 'alumni') {
          navigate('/dashboard');
        } else{
          navigate('/login');
        }
      } else {
        console.error('Failed to sign in.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={loginHandler}>Login</button>
    </>
  );
};

export default Login;
