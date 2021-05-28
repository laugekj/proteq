
import React, { useState, useEffect} from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import StepStep from '../Steps/StepStep';



export default function DashboardAdmin() {
   // HARDCODED SERVERSTEPS
   const initialSteps = [
    { id: 1, designId: 1, completed: false },
    { id: 2, designId: 2, completed: false },
    { id: 3, designId: 1, completed: false },
  ];
  
 
    const [ user, setUser] = useState()
    const [steps, setSteps] = useState(null)

    useEffect(()=>{
  

        const loggedInUser = localStorage.getItem("user");
        console.log("const loggedInUser:")
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        
        // Get list of steps
            fetch('api/userstep/getsteps/' + foundUser.id)
              .then(response => response.json())
              .then(data => setSteps(data))
        }


    }, []);
     
    if (user) {
        var hasPaid = JSON.parse(user.hasPaid)
        if (hasPaid === false) {
        // redirect user to checkoutRedirect
        window.location.href = '/CheckoutRedirect'
        }
        if (!steps) {
            return <div> loading </div>
        } else {
        return (
           
           
        <div>
            <div className="body">
                <h1 className="overskrift">Velkommen admin, {user.firstname + " " + user.lastname}!</h1>
                <center>
                    <Button onClick = {() => window.location.href = '/' }>Hjem</Button>
                    <Button onClick = {() => window.location.href = '/Profile' }>Profilside</Button>
                </center>
            
                <h2 className="stepsInfo">Du er nået x langt med dine steps</h2>
                {console.log(steps)}
            
                <div className="stepsContainer"> 
                   <StepStep serversteps={steps} /> 
                </div>            
            </div>
        </div>
           
            
        );
        }
    }
return (
                <div>
                    <h2>Du er ikke logget ind.</h2>
                </div>
            );
}

