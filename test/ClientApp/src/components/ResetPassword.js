import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography, Container, Button } from '@material-ui/core';

export default function ResetPassword() {
    const [password, setPassword] = useState("")


    return (
        <Container>
            <Typography>Reset Password</Typography>
            <TextField
            margin="normal"
            id="password"
            label="password"
            name="password"
            value={password}
            onChange= {(e) => setPassword(e.target.value)}
            ></TextField>
            <TextField
            margin="normal"
            id="confirm password"
            label="confirm password"
            name="confirm password"
        
            ></TextField>
          <Button
          size="small"
          variant="outlined"
          onClick={() => resetPassword()}
          >Reset Password</Button>
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