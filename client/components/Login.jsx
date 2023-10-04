import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// // export default function Login() {
// //     const [username, setUsername] = useState();
// //     const [password, setPassword] = useState();

// // }

// // TODO remove, this demo shouldn't need to reset the theme.

// // const defaultTheme = createTheme();

// export default function SignIn() {
//   const [username, setUsername] = useState();
//   const [password, setPassword] = useState();

//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     setUsername(data.get('username'));
//     setPassword(data.get('password'));
//   };

//   const validate = async () => {
//     try {
//       const response = await fetch('/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });
//       const data = await response.json();
//       if (data.verified === true) {
//         navigate('/Dashboard');
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

const defaultTheme = createTheme();
export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='username'
              name='username'
              autoComplete='username'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/forgotPassword' variant='body2'>
                  Forgot password?
                </Link>
                {/* <Button
                  type='button'
                  id='Forgot password'
                  onClick={() => navigate('/user/forgotpassword')}
                >
                Forgot Password?
                </Button> */}
                <Link href='/signup' variant='body2'>
                  "Don't have an account? Sign Up"
                </Link>
                {/* <Button
                  type='button'
                  id='signup'
                  onClick={() => navigate('/user/signup')}
                >
                  Don't have an account? Signup
                </Button> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}                     
               

{/* // import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Login() { */}
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

//   const getUsername = (e) => {
//     const username = e.target.value;
//     setUsername(username);
//   };

//   const getPassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };

//   const validate = async () => {
//     try {
//       const response = await fetch('/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });
//       const validated = await response.json();
//       if (validated) {
//         navigate('/');
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <html>
//       <body>
//         <form id='login-form'>
//           <label for='username'>Username:</label>
//           <input
//             type='text'
//             id='username'
//             name='username'
//             onChange={getUsername}
//           />
//           <label for='password'>Password:</label>
//           <input
//             type='password'
//             id='password'
//             name='password'
//             onChange={getPassword}
//           />
//           <button type='button' id='login' name='login' onClick={validate}>
//             Login
//           </button>
//           <button
//             type='button'
//             id='signup'
//             name='signup'
//             onClick={() => navigate('/user/signup')}
//           >
//             Signup
//           </button>
//           <button
//             type='button'
//             id='forgotpassword'
//             name='forgotpassword'
//             onClick={() => navigate('/user/forgotpassword')}
//           >
//             Forgot Password
//           </button>
//         </form>
//       </body>
//     </html>
//   );
// }
