
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/Textfield';
import EditPopover from './EditPopover';
import './Profile.css';

export function Profile() {
    const [ user, setUser] = useState()

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("user");
        console.log("const loggedInUser:")
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
    }, []);
     
    function deleteUser() {
    fetch('api/user/' + user.id, { method: 'DELETE' }).then(response => {
        console.log(response); 
        setUser(null);
    });
 }

 function getUser() {
    fetch('api/user/' + user.id, { method: 'GET' }).then(response => {
        return response.json();
    })
    .then((responseJson) => {
       setUser(responseJson);
       console.log("USER: "+user);
       localStorage.setItem('user', JSON.stringify(responseJson));
    });
 }

    if (user) {
  
    return (
            <div>
                {
                   
                        <div className="body">
                        <h1 className="overskrift">Velkommen, {user.firstname + " " + user.lastname}!</h1>
                        <h2 className="underoverskrift">Her kan du administrere dine oplysninger og din konto </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
                        <div className="dineoplysninger"> 
                        <h3 className="oplysninger"> Dine oplysninger</h3>
                        <h4 className="rubrik"> Navn</h4>
            
                <div className="profilredigering">
                <Textfield value={user.firstname + " " + user.lastname} />
                </div>
             
            <h4 className="rubrik"> Virksomhed</h4>

            <div className="profilredigering">
                  <Textfield value={user.company}/>
                </div>
                
            <h4 className="rubrik"> E-mail</h4>

            <div className="profilredigering">
            <Textfield  value={user.email}/>
             </div>

             <h4 className="rubrik"> Mobil nr.</h4>
             <div className="profilredigering">
                <Textfield value={user.phone}/>
                </div>
             </div>
             <div className="dineoplysninger">
             <h3 className="oplysninger"> Administrer din konto</h3>    
             <Button variant="primary" className="knap" onClick={deleteUser}>Slet min konto</Button>{' '}
             <Button variant="primary" className="knap">Ændre mine betalingsoplysninger</Button>{' '}
             <EditPopover 
                        onCloseFunc={getUser} user={user}>
             </EditPopover>
             <div className="kontaktos">
                 
             </div>
             </div>
          </div>
        </div>                    
                    
                
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