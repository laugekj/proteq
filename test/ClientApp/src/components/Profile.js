
import React, { useContext } from 'react';
import  { UserContext } from './UserContext';

function deleteUser(id) {
    id = 4;
    fetch('api/user/' + id, { method: 'DELETE' }).then(response => {
        console.log(response);
        // 200 is "OK" (success)
        if(response.status === 200) {
            this.forceRefetch();      
            console.log('Deleted succesfully' , 'deleted');
        }
        else {
            console.log('fejl');
        }
    });
 }


    export function Profile() {

    const { userEmail } = useContext(UserContext)
    const { userName } = useContext(UserContext)
    const { loggedIn } = useContext(UserContext)
    const { userCompany } = useContext(UserContext)
    
    return (
            <div>
                <h3>{userName}</h3>
                <h3>{userEmail}</h3>
                <h3>{userCompany}</h3>
                 <h3>{loggedIn}</h3>
                 <button onClick={() => deleteUser()}>Slet min konto</button>
            </div>
        );
}


        

    



