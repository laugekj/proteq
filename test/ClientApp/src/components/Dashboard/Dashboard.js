
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import StepStep from '../Steps/StepStep';



export default function Dashboard() {
   // HARDCODED SERVERSTEPS
   const initialSteps = [
    { id: 1, designId: 1, completed: false },
    { id: 2, designId: 2, completed: false },
    { id: 3, designId: 1, completed: false },
  ];

    const [ user, setUser] = useState()
    const [steps, setSteps] = useState(initialSteps)

  
    //TODO: GET STEPS FROM SERVER
    function getSteps() {
        const response = fetch('api/user');
        const data = response.json();
        setSteps(data)
    }

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("user");
        console.log("const loggedInUser:")
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
    }, []);
     
    if (user) {
        var hasPaid = JSON.parse(user.hasPaid)
        if (hasPaid == false) {
        // redirect user to checkoutRedirect
        window.location.href = '/CheckoutRedirect'
        } else {
        return (
            
        <div>
            <div class="body">
                <h1 class="overskrift">Velkommen, {user.firstname + " " + user.lastname}!</h1>
                <center>
                    <Button onClick = {() => window.location.href = '/' }>Hjem</Button>
                    <Button onClick = {() => window.location.href = '/Profile' }>Profilside</Button>
                </center>
                <div className="stepsContainer">
                    <StepStep serversteps={steps}></StepStep>    
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