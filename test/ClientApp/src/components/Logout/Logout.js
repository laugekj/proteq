
import React, { useState, useEffect } from 'react';

export function Logout() {
    const [ user, setUser] = useState()

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("user");
        console.log("const loggedInUser:")
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
    }, []);
     
 const handleLogout = () => {
    window.location.href = '/sign-in'
    setUser({});
    localStorage.clear();
  };

  handleLogout()
        return (
                <div></div>
            );


}