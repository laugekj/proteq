
import React, { useContext } from 'react';
import  { UserContext } from '.././UserContext';

export function Success() {
    const { userEmail, setUserEmail } = useContext(UserContext)
    const { userName, setUserName } = useContext(UserContext)
    const { loggedIn, setLoggedin } = useContext(UserContext)
    const { userCompany, setUserCompany } = useContext(UserContext) 
     
    return (
            <div>
                <h3>{userName}</h3>
                <h3>{userEmail}</h3>
                <h3>{userCompany}</h3>
                 <h3>{loggedIn}</h3>
            </div>
        );
}