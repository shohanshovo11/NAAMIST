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
      const response = await Axios.post('/auth/login', { email, password });

      // Extract token and role from response
      const { token, role, alumni } = response.data;
      // console.log('Token:', token, 'Role:', role, 'Alumni:', alumni);
      // Use `signIn` to store the token in a cookie
      const success = signIn({
        token,
        auth: {
          token: token,
          type: 'Bearer',
        },
        userState: {
          id: alumni?._id,
          role: alumni?.role,
          token: token
        }
      });

      if (success) {
        console.log('Successfully signed in!');
        // Navigate based on role
        if (role === 'alumni') {
          navigate('/alumni-dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
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
