
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
             <h1 class="overskrift">Velkommen, {user.firstname + " " + user.lastname}!</h1>
         </div>
     )
     }
     return (
        <div>
            <h2>Du er ikke logget ind.</h2>
        </div>
    );
}

    