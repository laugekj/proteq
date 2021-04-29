
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

     
      checkPaymentToken() 

     function checkPaymentToken() 
     {
      const URLtoString = window.location.href 
      const data = {url: URLtoString}
        fetch('api/payments/VerifyPaymentToken', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
          if (response.status == 200) {
            console.log("OK!!!")
          }
      });
     }

    return (
            <div>
                <h1>Din betaling er gået igennem!</h1>
            </div>
        );
}