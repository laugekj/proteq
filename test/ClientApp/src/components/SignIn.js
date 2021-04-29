import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './SignIn.css';
import './Reset.css';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ProteQ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
 
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#B63E48',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() { 
  const classes = useStyles()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState()
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log("const loggedInUser:")
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  
  // logout the user
  const handleLogout = () => {
    setUser({});
    setEmail("");
    setPassword("");
    localStorage.clear();
    window.location.reload();
  };

  // if there's a user show the message below
  if (user) {
    // redirect user to dashboard
    window.location.href = '/dashboard'
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange= {(e) => setEmail(e.target.value)}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
           
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange= {(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button 
           //type="submit"
            fullWidth
            variant="contained"
            color= "secondary"
            onClick={() => login()}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

  
  function login() {
    // [DEVELOPER MODE]: Check if user setting are stored.
    console.log("[DEVELOPER MODE] : Typed email: " + email);
    console.log("[DEVELOPER MODE] : Typed password: " + password);
    const loginData = { Mail: email, Password: password };

    fetch('api/userlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    }).then(response => {
        return response.json()       
      })
      .then((responseJson) => {
        // Er ikke fan af, at den bruger "else" til at logge ind... tag i fællesskab
        // den kan ikke lide responseJson.status === 200, fordi vi returner user.
         if (responseJson.status === 401) {
          alert('Forkert brugeroplysninger!')
        } else {
            // set the state of the user
            setUser(responseJson)
            // store the user in localStorage
            localStorage.setItem('user', JSON.stringify(responseJson))
          }
        //}
      })
    }
}