import React from 'react';
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const backendURL = 'https://backend-platform-oxxu.onrender.com';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    fetch(`${backendURL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        username: email,
        password: password,
      },
      body: JSON.stringify({}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
    }}>
      <div style={{
        width: '400px',
        padding: '30px',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#4a00e0',
        }}>
          Welcome Back!
        </div>
        <div style={{
          marginBottom: '30px',
        }}>
          <GoogleLoginButton onClick={() => console.log("Google login clicked")} />
        </div>
        <div style={{
          marginBottom: '20px',
        }}>
          <FacebookLoginButton onClick={() => console.log("Facebook login clicked")} />
        </div>
        <div style={{
          color: '#4a00e0',
          fontSize: '18px',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          - OR -
        </div>
        <TextField
          id="outlined-basic"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="outlined-basic"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <button style={{
          width: '100%',
          height: '50px',
          borderRadius: '8px',
          background: '#4a00e0',
          color: '#FFF',
          fontSize: '18px',
          fontWeight: 'bold',
          marginTop: '30px',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
        onClick={handleLogin}
        >
          Login
        </button>
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
        }}>
          <button
            style={{
              border: 'none',
              background: 'none',
              color: '#4a00e0',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
