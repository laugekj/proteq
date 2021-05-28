import React, { useState } from 'react';
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({handleClose}) {
  const classes = useStyles();
  const [firstname, setFirstname] = useState(""); 
  const [lastname, setLastname] = useState(""); 
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const updateAdmin = () => setIsAdmin(!isAdmin);
  const [hasPaid, setHasPaid] = useState(false);
  const updateHadPaid = () => setHasPaid(!hasPaid);
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Opret Bruger
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
                label="Fornavn"
                onChange={(e) => setFirstname(e.target.value)}
                autoFocus
              />
            
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={lastname}
                id="lastName"
                label="Efternavn"
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
                label="Firma"
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
                label="Telefonnummer"
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
                label="E-mail Addresse"
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
                control={<Checkbox checked={isAdmin} onChange={updateAdmin} color="primary" />}
                label="Administrator"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={hasPaid} onChange={updateHadPaid} color="primary" />}
                label="Betalt"
              />
            </Grid>
          </Grid>
          <Button
          //  type="submit"
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

  function CreateUserRegistration(userFromDB) {
    // creates the user in the Users Table. This must be done otherwise the UserRegistration table cant add the entry due to foreign key constraints.
    //CreateUserInUserTable();

    // creates userRegistration if email doesent exists
    const registrationData = { Mail: email, Password: password };
    fetch('api/userregistration', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    }).then(response => {
        // 200 is "ok" (success)
        if(response.status === 200) {
    
        } else {
           // Error handling and
           // Delete the User from Users Table if the email already existed
        
        }
    });
  }

  function CreateUser() {
    if (!firstname || !lastname || !phone || !company || !email || !password) {
      alert('Du skal udfylde alle felter for at kunne oprette en bruger.');
      return
    }

    if (validateEmail(email) === false) {
      alert('Du skal skrive en korrekt email.');
      return
    }

    const data = { Phone: phone, Firstname: firstname, Lastname: lastname, Company: company, Email: email,Password: password ,IsAdmin: isAdmin, HasPaid: hasPaid};
    fetch('api/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => {
        response.json();
        console.log(response);
        // 201 is "Created" (success)
        if(response.status === 201) {
            handleClose();
            console.log("Created User", data)
        } else {
            // waah, error handler
        }
    }).then(data => {
      CreateUserRegistration(data);
    }).catch((error) => {}); 
  }

  function validateEmail(vEmail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(vEmail).toLowerCase());
}


}
