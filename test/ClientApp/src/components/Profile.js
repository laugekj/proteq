
import React, { useContext, useState, useEffect } from 'react';
import  { UserContext } from './UserContext';
import EditPopover from './EditPopover';


export function Profile() {
    const { loggedIn, setLoggedin } = useContext(UserContext)
    const { userCompany } = useContext(UserContext) 
    const { id } = useContext(UserContext) 
    const edit = useState(false)
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ user, setUser] = useState([])

    useEffect(()=>{
       getUser();
    }, [])

    
     
    function deleteUser() {
    fetch('api/user/' + id, { method: 'DELETE' }).then(response => {
        console.log(response); 
        setLastName(null);
        setFirstName(null);
        setEmail(null);
        setLoggedin(false);
    });
 }


 function getUser() {
    fetch('api/user/' + id, { method: 'GET' }).then(response => {
        return response.json();
    })
    .then((responseJson) => {
       console.log(responseJson);
       console.log(responseJson.firstname);
       console.log(responseJson.lastname);
       setLastName(responseJson.lastname);
       setFirstName(responseJson.firstname);
       setEmail(responseJson.email);
       setUser(responseJson);
       console.log(user);
       
    });
 }


    // if (!edit)
    // {
    //     return (
    //         <div>
    //              <input type="text" onChange={(e) => setUserName(e.target.value)}></input>
    //              <input type="text" onChange={(e) => setUserEmail(e.target.value)}></input>
    //         </div>
    //     );
    // }
  
    return (
            <div>
                {loggedIn ? 
                (
                    <React.Fragment>
                        <h3>{firstName + " " + lastName}</h3>
                        <h3>{email}</h3>
                        <h3>{userCompany}</h3>
   
                        <button onClick={deleteUser}>Slet min konto!</button>
                        <EditPopover 
                        onCloseFunc={getUser} user={user}>
                        </EditPopover>
                    </React.Fragment>
                )
                : 
                (  
                    <React.Fragment>
                      
                      
                    </React.Fragment>
                
                )}
            </div>
        );
}