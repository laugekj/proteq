
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

      if (user) {
        var hasPaid = JSON.parse(user.hasPaid)
        if (hasPaid) {
        // redirect user to dashboard
        window.location.href = '/dashboard'
        }
        else {
        
        
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
            // set the state of the user
            return response.json();
          } 
      }).then(responseJson => {
            setUser(responseJson)
            // overwrite the new user information (hasPaid) in localStorage
            localStorage.setItem('user', JSON.stringify(responseJson))
      });
     }
    }
}
    return (
            <div>
                <h1>Din betaling er gået igennem!</h1>
            </div>
        );
  
}