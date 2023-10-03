import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityQuestionFetched, setSecurityQuestionFetched] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      if (username) {
        fetchSecurityQuestion(username);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [username]);

  const fetchSecurityQuestion = async (username) => {
    try {
      const response = await fetch(`/user/forgotPassword/:${username}`);
      if (response.ok) {
        const data = await response.json();
        setSecurityQuestion(data.securityQuestion);
        setSecurityQuestionFetched(true);
      } else {
        console.error('Failed to retrieve security question.');
        setSecurityQuestion('');
        setSecurityQuestionFetched(false);
      }
    } catch (error) {
      console.error('Error occurred while fetching security question:', error);
      setSecurityQuestion('');
      setSecurityQuestionFetched(false);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setSecurityQuestionFetched(false);
  };

  const handleSecurityAnswerChange = (event) => {
    setSecurityAnswer(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/user/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          securityAnswer: securityAnswer,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        useNavigate('.login')
      } else {
        console.error('Failed to reset password.');
      }
    } catch (error) {
      console.error('Error occurred while resetting password:', error);
    }
  };

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
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
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
              {securityQuestion && (
                <Typography variant="body2" color="text.secondary">
                  Security Question: {securityQuestion}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="secret-answer"
                label="Secret answer"
                id="secret-answer"
                disabled={!securityQuestionFetched}
                value={securityAnswer}
                onChange={handleSecurityAnswerChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="new password"
                type="password"
                id="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Verify
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

export default ForgotPassword;
