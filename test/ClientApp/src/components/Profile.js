
import React, { useContext, useEffect, useState } from 'react';

export function Profile() {
    const [user, setUser] = useState()

    useEffect(() => {
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
                <h3>{user.firstname}</h3>
                <h3>{user.email}</h3>
                <h3>{user.company}</h3>
                 <h3>{user.id}</h3>
            </div>
        
        );
      }

    return (
            <div>
                <h2>Du er ikke logget ind.</h2>
            </div>
        );
}