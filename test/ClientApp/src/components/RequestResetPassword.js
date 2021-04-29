import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography, Container, Button } from '@material-ui/core';

export default function RequestResetPassword() {



    return (
        <Container>
            <Typography>Reset Password</Typography>
            <TextField
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            ></TextField>

          <Button
          size="small"
          variant="outlined"
          >Reset Password</Button>
        </Container>


    );
}