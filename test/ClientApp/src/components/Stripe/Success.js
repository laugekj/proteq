
import React, { useEffect, useState } from 'react';
import  { UserContext } from '.././UserContext';
import './checkout.css';

export function Success() {
    const [ user, setUser] = useState()
    useEffect(()=>{
        getUser();
      }, []);

      

      function getUser() {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        fetch('api/user/' + foundUser.id, { method: 'GET' }).then(response => {
          if (response.status == 404) {
            return {}
          }
          return response.json();
        })
        .then((responseJson) => {
            // opdater hasPaid i localstorage
           setUser(responseJson);
           localStorage.setItem('user', JSON.stringify(responseJson));
        });
      }
     }

      if (user) {
        var hasPaid = JSON.parse(user.hasPaid)
        if (hasPaid) {
        // redirect user to dashboard
        window.location.href = '/dashboard'
        }
        else {
          window.location.href = '/home'
    }
}
    return (
            <div className="content">
                <h1>Din betaling er gået igennem...</h1>
                <h1>Vent venligst...</h1>
            </div>
        );
  
}