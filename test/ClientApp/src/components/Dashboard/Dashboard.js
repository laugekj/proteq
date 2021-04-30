
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';

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
        var hasPaid = JSON.parse(user.hasPaid)
        if (hasPaid == false) {
        // redirect user to checkoutRedirect
        window.location.href = '/CheckoutRedirect'
        } else {
        return (
            
        <div>
                {
                    <React.Fragment>
                        <div class="body">
                        <h1 class="overskrift">Velkommen, {user.firstname + " " + user.lastname}!</h1>
                        <center>
                            <Button onClick = {() => window.location.href = '/' }>Hjem</Button>
                            <Button onClick = {() => window.location.href = '/Profile' }>Profilside</Button>
                        </center>
                        
        </div>    
                    </React.Fragment>
                
                }
            </div>
        );
        }
    }
return (
                <div>
                    <h2>Du er ikke logget ind.</h2>
                </div>
            );
}