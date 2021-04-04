import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { injectStripe, CardElement } from 'react-stripe-elements'
import PropTypes from 'prop-types'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  // TODO: Implementer auto-fill oplysninger, samarbejde mellem hjemmeside og browser.
  /*
  TODO: Mangler cardElement - evt. få hjælp fra gruppe ift. implementation
  HTML KODE:

  <div style={{width: '450px', margin: '10px', padding: '5px', border: '2px solid green', borderRadius: '10px'}}>
    <CardElement style={{base: {fontSize: '18px'}}}/>
  </div>
   
  */

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        
        <TextField
          required
          id="outlined-required"
          label="Fornavn"
          defaultValue=""
          variant="outlined"
        />
          <TextField
          required
          id="outlined-required"
          label="Efternavn"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
          variant="outlined"
        />
         <TextField
          required
          id="outlined-required"
          label="Telefonnummer"
          defaultValue="+45 "
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Adresse"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="By"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Postnummer"
          defaultValue=""
          variant="outlined"
        />
         <TextField
          required
          id="outlined-required"
          label="Land"
          defaultValue=""
          variant="outlined"
        />
      </div>
      
    </form>
  );
}
