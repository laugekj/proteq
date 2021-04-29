import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography, Container, Button } from '@material-ui/core';
import './RequestResetPassword.css';
import './Reset.css';

export default function RequestResetPassword() {
    const [mail, setMail] = useState("")
    const [sentMail, setSentMail] = useState(false);

    if (!sentMail) {
      return (
      
        <Container>
            <h1>Nulstilling af kodeord</h1>
            
            <TextField
            margin="normal"
            id="mail"
            label="Email"
            name="mail"
            value={mail}
            onChange= {(e) => setMail(e.target.value)}
            autoComplete="email"
            ></TextField>
            
          
          <Button
          onClick={() => requestResetPassword()}
          size="small"
          variant="outlined"
          >Nulstil kodeord</Button>
        </Container>


    );
    } else {
      return (
        <Container>
          <Typography>
            Mail med vejledning til at ændre sit kodeord sendy til: {mail}.
          </Typography>
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
                // waaah, error handler
          }
        });
          
    }
}