import React, { useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography, Container, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import './RequestResetPassword.css';
import './Reset.css';

export default function RequestResetPassword() {
    const [mail, setMail] = useState("")
    const [sentMail, setSentMail] = useState(false);
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
     
      window.location.href = '/dashboard'
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
    if (!sentMail) {
      return (
        
        <Container>
          <div class="content">
        <Grid container direction="column" justify="center" alignItems="center">
        <div className="resetpass"> 
            <h1 id='overskrift' className='overskrift'>Nulstilling af kodeord</h1>
            <TextField
            margin="normal"
            id="mail"
            label="Email"
            name="mail"
            value={mail}
            onChange= {(e) => setMail(e.target.value)}
            autoComplete="email"
            ></TextField>
            </div>
          <div className="resetpass"> 
          <Button
          id="NulstilKode"
          onClick={() => requestResetPassword()}
          size="small"
          variant="outlined"
          >Nulstil kodeord</Button>
          </div>
          </Grid>
          </div>
        </Container>
      

    );
    } else {
      return (
        <Container>
          <div class="content">
          <Typography id="text">
            Vejledning til nustillelse af kodeord sendt til: {mail}.
          </Typography>
          </div>
        </Container>
      );
    }
    

    function requestResetPassword() {
        const URLtoString = window.location.href
        const data = { Mail: mail, Url: URLtoString };
        fetch('api/userlogin/createresetmodel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then(response => {
          console.log(response);
          // 200 is "OK" (success)
          if(response.status === 200) {
            setSentMail(true);
          //  console.log('Updated password', data);
          } else {
            // so the user doesn't know if the mail is actually in our DB
            setSentMail(true);
          }
        });
          
    }
}