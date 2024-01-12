import React, { useState } from 'react';
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const backendURL = 'https://backend-platform-oxxu.onrender.com';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    fetch(`${backendURL}/admin/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Admin created successfully') {
          navigate('/');
          localStorage.setItem('token', data.token);
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(to right, #86BFAF, #4CAF50)' }}>
        <div style={{ width: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)' }}>
          {/* Right Section */}
          <div style={{ background: '#FFFFFF', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px 0px 0px 16px' }}>
            <div style={{ color: '#4CAF50', fontFamily: 'Montserrat', fontSize: '32px', fontWeight: 800, marginBottom: '20px', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
              Create Your Account
            </div>
            <form style={{ width: '100%' }}>
              <TextField label="Email" variant="outlined" fullWidth type="email" onChange={e => setEmail(e.target.value)} style={{ marginBottom: '20px' }} InputProps={{ style: { borderRadius: '5px' } }} />
              <TextField label="Password" variant="outlined" fullWidth type="password" onChange={e => setPassword(e.target.value)} style={{ marginBottom: '20px' }} InputProps={{ style: { borderRadius: '5px' } }} />
              <Button
                onClick={handleSignup}
                variant="contained"
                fullWidth
                sx={{
                  background: '#4CAF50',
                  color: '#FFF',
                  height: '50px',
                  borderRadius: '5px',
                  fontSize: '18px',
                  fontWeight: 800,
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'background 0.3s',
                  '&:hover': {
                    background: '#45a749',
                  },
                }}
              >
                Create Account
              </Button>
            </form>
            <p style={{ marginTop: '20px', color: '#333', fontSize: '14px' }}>
              Already have an account? <span style={{ cursor: 'pointer', color: '#4CAF50', fontWeight: 'bold' }} onClick={() => navigate('/login')}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Signup;
