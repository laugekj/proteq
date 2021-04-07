import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

// sample function defined to compute total quantity of cart
function computeQuantity(cart) {
    return cart.reduce((count, itemInCart) => count + itemInCart.quantity, 0);
}
// similar functions can be defined to compute total price, email of the user, etc.

class CheckoutWithStripe extends React.Component {
    onToken = (res) => {
        fetch('api/paymentcontroller/processing', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(res => {
            res.json().then(data => {
                console.log(`Payment token generated, ${data.name}`)
            })
        })
    };

    

    render() {
        return (
            <StripeCheckout
                amount = '10.00'
                name="STRIPE_INTEGRATION"
                // functions defined above can be used to add more information while making the API call.
                // description={`Order of ${computeQuantity(cart)} items!`}
                //image='LINKTOIMAGE'
                stripeKey="pk_test_51IbPuXH6yYcILY3fiORwNX6W1NCnkrVxRb0In6w9bWSZlCwEPvI97e1rBHyArQoCkBoRxxLMmeSfy2qMR5CXd0WX009ztSxylY"
                currency="DKK"
                email='TEST@MAIL.DK'
                token={this.onToken}/>          
        );
    }
}

export default CheckoutWithStripe