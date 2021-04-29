import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IbPuXH6yYcILY3fiORwNX6W1NCnkrVxRb0In6w9bWSZlCwEPvI97e1rBHyArQoCkBoRxxLMmeSfy2qMR5CXd0WX009ztSxylY');

function Checkout() {
  const [ user, setUser] = useState()

  useEffect(()=>{
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  function createPaymentToken() {
    fetch('api/payments/createPaymentToken', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }).then(response => {
      if (response.status == 200) {
        handleClick();
      }
  });
  }

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    // Call your backend to create the Checkout Session
    const response = await fetch('api/payments/create-checkout-session', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)});

    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
     <Button
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={() => createPaymentToken()}
            >
            Gå videre til betaling
     </Button>
  );

}

export default Checkout