
import React, { useEffect, useState } from 'react';
import  { UserContext } from '.././UserContext';

export function Success() {
    const [ user, setUser] = useState()
    useEffect(()=>{
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);

     
    
     function deletePaymentTokenIfExists() 
     {
        const URLtoString = window.location.href 
        const data = {URLtoString, URLtoString}
        fetch('api/payments', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
          if (response.status == 200) {
            //handleClick();
          }
      });
     }

    return (
            <div>
                <h1>Din betaling er gået igennem!</h1>
            </div>
        );
}