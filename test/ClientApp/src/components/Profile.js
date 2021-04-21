import React, { Component, UserContext } from 'react';
import Button from '@material-ui/core/Button';
import EdiText from 'react-editext'
import './Profile.css';

//import  { UserContext } from './UserContext';
    
  export class Profile extends Component {
    onSave = val => {
        console.log('Edited Value -> ', val)
      }
    static displayName = Profile.name;

    
   
   render () {
      return (
        <div class="body">
          <h1 class="overskrift">Velkommen, Poul Flemming!</h1>
          <h2 class="underoverskrift">Her kan du administrere dine oplysninger og din konto </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
             <div class="dineoplysninger"> 
             <h3 class="oplysninger"> Dine oplysninger</h3>
             <h4 class="rubrik"> Navn</h4>
            <EdiText
                class="profilredigering"
                value="Poul Henning"  
                onSave={this.onSave}
                />
             <h4 class="rubrik"> Virksomhed</h4>
             <EdiText
                class="profilredigering"
                value='Google'
                onSave={this.onSave}
                />
             <h4 class="rubrik"> E-mail</h4>
             <EdiText
                class="profilredigering"
                value='poul.henning@gmail.com'
                onSave={this.onSave}
                />
             <h4 class="rubrik"> Mobil nr.</h4>
             <EdiText
                class="profilredigering"
                value='42874509'
                onSave={this.onSave}
                />
             </div>
             <div class="dineoplysninger">
             <h3 class="oplysninger"> Administrer din konto</h3>    
             <Button variant="primary" classname="knap">Slet min konto</Button>{' '}
             <Button variant="primary" classname="knap">Ændre mine betalingsoplysninger</Button>{' '}
             <div class="kontaktos">
                 
             </div>
             </div>
          </div>
        </div>
      );
    }
  }
  


/*export function Profile() {
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
*/