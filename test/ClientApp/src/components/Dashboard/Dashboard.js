
import React, { useState, useEffect} from 'react';
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
    const [steps, setSteps] = useState(null)



  
    //TODO: GET STEPS FROM SERVER
    function getSteps() {
        fetch('api/fileupload')
            .then(response => console.log("response" + response.json()))
            .then(data => setSteps(data))
            .then(data => console.log("data: " + data));
            console.log("tried to fetch");
        }


   function getUser() {
        fetch('api/steps/').then(response => {
            return response.json();
        })
        .then((responseJson) => {
             setSteps(responseJson);
        });
    }

    useEffect(()=>{
        // Get list of steps
        fetch('api/file')
            .then(response => response.json())
            .then(data => setSteps(data))

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
        }
        if (!steps) {
            return <div> loading </div>
        } else {
        return (
           
           
        <div>
            <div class="body">
                <h1 class="overskrift">Velkommen, {user.firstname + " " + user.lastname}!</h1>
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

