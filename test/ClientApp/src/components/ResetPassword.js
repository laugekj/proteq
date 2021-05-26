import React, { useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography, Container, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import './ResetPassword.css';
import './Reset.css';

export default function ResetPassword() {
    const [password, setPassword] = useState("")
    const [user, setUser] = useState()
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    }, []);

    // if there's a user show the message below
    if (user) {
      var isAdmin = JSON.parse(user.isAdmin)
    if (isAdmin) {
    
      window.location.href = '/dashboardAdmin'
    }
      var hasPaid = JSON.parse(user.hasPaid)
    if (hasPaid && !isAdmin) {
      // redirect user to dashboard
      window.location.href = '/dashboard'
      }
      else if (!hasPaid && !isAdmin) {
      // redirect user to checkoutRedirect
      window.location.href = '/CheckoutRedirect'
      }
    }

    return (
        <Container>
           <Grid container direction="column" justify="center" alignItems="center">
           <div class="resetpass"> 
            <h1 id='overskrift'>Opret nyt kodeord</h1>
            <TextField
            margin="normal"
            id="password"
            label="Nyt kodeord"
            type="password"
            name="password"
            value={password}
            onChange= {(e) => setPassword(e.target.value)}
            ></TextField>
            </div>
            <div class="resetpass"> 
            <TextField
            onclick="myFunction()"
            margin="normal"
            id="confirm password"
            label="Bekræft dit nye kodeord"
            type="password"
            name="confirm password"
        
            ></TextField>
            </div>
            <div class="resetpass"> 
          <Button
          id='NulstilKode'
          size="small"
          variant="outlined"
          onClick={() => resetPassword()}
          >Skift mit kodeord</Button>
          </div>
          </Grid>
        </Container>


    );
   

    function resetPassword() {
        const URLtoString = window.location.href
        const data = { Url: URLtoString, Password: password };
        fetch('api/userregistration', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then(response => {
          console.log(response);
          // 200 is "OK" (success)
          if(response.status === 200) {
            console.log('Updated password', data);
            window.location.href = '/sign-in';
          } else {
            // waaah, error handler
          }
        });
      }
}