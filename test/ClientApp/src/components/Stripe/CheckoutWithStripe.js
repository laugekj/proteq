import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IbPuXH6yYcILY3fiORwNX6W1NCnkrVxRb0In6w9bWSZlCwEPvI97e1rBHyArQoCkBoRxxLMmeSfy2qMR5CXd0WX009ztSxylY');

function CheckoutWithStripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutWithStripe