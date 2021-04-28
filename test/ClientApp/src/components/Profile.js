// import React, { useContext, useEffect, useState } from 'react';

// export function Profile() {
//     const [user, setUser] = useState()

//     useEffect(() => {
//         const loggedInUser = localStorage.getItem("user");
//         console.log("const loggedInUser:")
//         if (loggedInUser) {
//           const foundUser = JSON.parse(loggedInUser);
//           setUser(foundUser);
//         }
//       }, []);

//       if (user) {
//         return (
//             <div>
//                 <h3>{user.firstname}</h3>
//                 <h3>{user.email}</h3>
//                 <h3>{user.company}</h3>
//                  <h3>{user.id}</h3>
//             </div>
        
//         );
//       }

//     return (
//             <div>
//                 <h2>Du er ikke logget ind.</h2>
//             </div>
//         );
// }

import React, { useContext, useState, useEffect } from 'react';
import  { UserContext } from './UserContext';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/Textfield';
import EditPopover from './EditPopover';
import './Profile.css';

export function Profile() {
    const { loggedIn, setLoggedin } = useContext(UserContext)
    const { id } = useContext(UserContext)

    const [ company, setCompany ] = useState("") 
    const [ phone, setPhone ] = useState("") 
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ user, setUser] = useState()

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("user");
        console.log("const loggedInUser:")
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
      // getUser();
        }
    }, []);

    
     
    function deleteUser() {
    fetch('api/user/' + id, { method: 'DELETE' }).then(response => {
        console.log(response); 
        setLastName(null);
        setFirstName(null);
        setEmail(null);
        setCompany(null);
        setPhone(null);
        setLoggedin(false);
    });
 }

 function getUser() {
    fetch('api/user/' + id, { method: 'GET' }).then(response => {
        return response.json();
    })
    .then((responseJson) => {
       console.log(responseJson);
       setLastName(responseJson.lastname);
       setFirstName(responseJson.firstname);
       setEmail(responseJson.email);
       setCompany(responseJson.company);
       setPhone(responseJson.phone);
       setUser(responseJson);
       console.log("USER: "+user);
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
    if (user) {
  
    return (
            <div>
                {
                    <React.Fragment>
                        <div class="body">
                        <h1 class="overskrift">Velkommen, {user.firstname + " " + user.lastname}!</h1>
                        <h2 class="underoverskrift">Her kan du administrere dine oplysninger og din konto </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)" }}>
                        <div class="dineoplysninger"> 
                        <h3 class="oplysninger"> Dine oplysninger</h3>
                        <h4 class="rubrik"> Navn</h4>
            
            <div class="profilredigering">
                <Textfield value={user.firstname + " " + user.lastname} />
                </div>
             
            <h4 class="rubrik"> Virksomhed</h4>
            <div class="profilredigering">
                  <Textfield value={user.company}/>
                </div>
                
            <h4 class="rubrik"> E-mail</h4>
            <div class="profilredigering">
            <Textfield  value={user.email}/>
             </div>

             <h4 class="rubrik"> Mobil nr.</h4>
             <div class="profilredigering">
                <Textfield value={user.phone}/>
                </div>
             
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
             <Button variant="primary" classname="knap" onClick={deleteUser}>Slet min konto</Button>{' '}
             <EditPopover 
                        class="edituser" onCloseFunc={getUser} user={user}>
             </EditPopover>
             </div>
             </div>
          </div>
        </div>
                    
                      
                      
                    </React.Fragment>
                
                }
            </div>
        );
}
return (
                <div>
                    <h2>Du er ikke logget ind.</h2>
                </div>
            );
}