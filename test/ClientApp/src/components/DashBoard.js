
import React, { useState, useEffect } from 'react';

export function DashBoard() {
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
     return(
         <div>
             <h1 class="overskrift">Velkomasdasdmen test, {user.firstname + " " + user.lastname}!</h1>
             <button onClick = {() => window.location.href = '/' }>Hjem</button>
             <button onClick = {() => window.location.href = '/Profile' }>Profilside</button>
         </div>
     )
     }
     return (
        <div>
            <h2>Du er ikke logget ind.</h2>
        </div>
    );
}

    