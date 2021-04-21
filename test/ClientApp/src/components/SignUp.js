
import React, { useEffect, useState, useContext } from 'react';
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
import  { UserContext } from './UserContext';
import Checkout from './Stripe/Checkout'; 


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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [firstname, setFirstname] = useState(""); 
  const [lastname, setLastname] = useState(""); 
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userEmail, setUserEmail } = useContext(UserContext);
  const { userName, setUserName } = useContext(UserContext);
  const { loggedIn, setLoggedin } = useContext(UserContext);
  const { userCompany, setUserCompany } = useContext(UserContext);
  const { id, setId } = useContext(UserContext);


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                value={firstname}
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => setFirstname(e.target.value)}
                autoFocus
              />
              {console.log(firstname)}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={lastname}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="company"
                value={company}
                onChange= {(e) => setCompany(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={phone}
                onChange= {(e) => setPhone(e.target.value)}
                id="phone"
                label="Phone number"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={email}
                onChange= {(e) => setEmail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={() => CreateUser()}
            >
            Opret bruger
          </Button>
          
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

    function SaveContext() {
      setUserEmail(email);
      setUserName(firstname);
      setUserCompany(company);
    }


  function CreateUser() {

    // creates the user in the Users Table. This must be done otherwise the UserRegistration table cant add the entry due to foreign key constraints.
    CreateUserInUserTable();


    // creates userRegistration if email doesent exists
    const registrationData = { Mail: email, Password: password };
    fetch('api/userregistration', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    }).then(response => {
        console.log(response);
        // 200 is "ok" (success)
        if(response.status === 200) {
            console.log("Created UserRegistration", registrationData);
           
        } else {
           // Error handling and
           // Delete the User from Users Table if the email already existed
        
        }
    });

  }
  function CreateUserInUserTable() {
    const userData = { Phone: phone, firstname: firstname, Lastname: lastname, Company: company, Email: email };
    fetch('api/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
     
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  function DeleteUserInUserTable(id) {
    fetch('api/user/' + id, {
      method: 'DELETE',
    });
  }

}

