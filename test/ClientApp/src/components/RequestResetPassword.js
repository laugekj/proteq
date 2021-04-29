import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography, Container, Button } from '@material-ui/core';

export default function RequestResetPassword() {
    const [mail, setMail] = useState("")


    return (
        <Container>
            <Typography>Reset Password</Typography>
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
          onClick={() => resetPassword()}
          size="small"
          variant="outlined"
          >Reset Password</Button>
        </Container>


    );

    function resetPassword() {
        const URLtoString = window.location.href
        const data = { Mail: mail, Url: URLtoString };
        console.log(mail);
        console.log(data.Mail);
        fetch('api/userlogin/createresetmodel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then(response => {
          console.log(response);
          // 200 is "OK" (success)
          if(response.status === 200) {
          
          //  console.log('Updated password', data);
          } else {
                // waaah, error handler
          }
        });
          
    }
}