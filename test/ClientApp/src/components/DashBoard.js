
import React, { useState, useEffect } from 'react';
import './Profile.css';

export function DasgBoard() {
    const [ user, setUser] = useState()

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
    }, []);

     return(
         <div>
             <h1 class="overskrift">Velkommen, {user.firstname + " " + user.lastname}!</h1>
         </div>
     )

}

    