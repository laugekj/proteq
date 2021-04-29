
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/Textfield';
import Checkout from '../Stripe/Checkout'; 

export function Dashboard() {
    const [ user, setUser] = useState()

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("user");
        console.log("const loggedInUser:")
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
    }, []);
     
  

    if (user) {
        
        return (
            
        <div>
                {
                    <React.Fragment>
                        <div class="body">
                        <h1 class="overskrift">Velkommen, {user.firstname + " " + user.lastname}!</h1>
                    <Checkout />
        </div>    
                    </React.Fragment>
                
                }
            </div>
        );
}
return (
                <div>
                    <h2>Du er ikke logget ind.</h2>
                </div>
            );
}