
import React, { useContext, useState, useEffect } from 'react';
import  { UserContext } from './UserContext';
import Button from '@material-ui/core/Button';
import EdiText from 'react-editext'
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
       getUser();
    }, [])

    
     
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
  
    return (
            <div>
                {loggedIn ? 
                (
                    <React.Fragment>
                        <div class="body">
                        <h1 class="overskrift">Velkommen, {firstName + " " + lastName}!</h1>
                        <h2 class="underoverskrift">Her kan du administrere dine oplysninger og din konto </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
                        <div class="dineoplysninger"> 
                        <h3 class="oplysninger"> Dine oplysninger</h3>
                        <h4 class="rubrik"> Navn</h4>
            
            <EdiText
                class="profilredigering"
                value={firstName + " " + lastName}
                />
             
            <h4 class="rubrik"> Virksomhed</h4>
            <EdiText
                class="profilredigering"
                value={company}
                />
                
            <h4 class="rubrik"> E-mail</h4>
            <EdiText
                class="profilredigering"
                value={email}
                
                />
             <h4 class="rubrik"> Mobil nr.</h4>
             <EdiText
                class="profilredigering"
                value={phone}
                
                />
             </div>
             <div class="dineoplysninger">
             <h3 class="oplysninger"> Administrer din konto</h3>    
             <Button variant="primary" classname="knap" onClick={deleteUser}>Slet min konto</Button>{' '}
             <Button variant="primary" classname="knap">Ændre mine betalingsoplysninger</Button>{' '}
             <EditPopover 
                        onCloseFunc={getUser} user={user}>
             </EditPopover>
             <div class="kontaktos">
                 
             </div>
             </div>
          </div>
        </div>
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