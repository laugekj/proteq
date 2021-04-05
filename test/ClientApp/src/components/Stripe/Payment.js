import React from 'react'
import {StripeProvider, Elements} from 'react-stripe-elements'
import PaymentForm from './PaymentForm'

const Payment = () => {
  return (
            <StripeProvider apiKey="pk_test_51IbPuXH6yYcILY3fiORwNX6W1NCnkrVxRb0In6w9bWSZlCwEPvI97e1rBHyArQoCkBoRxxLMmeSfy2qMR5CXd0WX009ztSxylY">
                <Elements>
                    <PaymentForm/>
                </Elements>
            </StripeProvider>
  )
}

export default Payment