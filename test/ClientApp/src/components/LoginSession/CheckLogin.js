import React, { useEffect, useState } from 'react';

export default function SignIn() { 
  const [user, setUser] = useState()
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  

  // if user is not logged in
  if (!user) {
   {
    // redirect user to Sign in page
    window.location.href = '/sign-in'
    }
  }
  
  
  return (
    <div></div>
  );

}