
import React, { useState, useEffect} from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import StepStep from '../Steps/StepStep';



export default function Dashboard() {


  
 
    const [user, setUser] = useState()
    const [steps, setSteps] = useState([])
    const [doneSteps, setDoneSteps] = useState([])

    


    useEffect(() => {
        // Get list of steps
        fetch('api/file')
        .then(response => response.json())
        .then(data => setSteps(data));


        const loggedInUser = localStorage.getItem("user");
        console.log("const loggedInUser:")
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);

        // since user is logged in find completed steps
        // Get list of steps completed by user
        
        fetch('api/userstep/getstepsbyuid/' + foundUser.id)
        .then(response => response.json())
        .then(data => setDoneSteps(data));
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
                <h1 className="overskrift">Velkommen, {user.firstname + " " + user.lastname}!</h1>
                <center>
                    <Button onClick = {() => window.location.href = '/' }>Hjem</Button>
                    <Button onClick = {() => window.location.href = '/Profile' }>Profilside</Button>
                </center>
            
                <h2 className="stepsInfo">Du er nået x langt med dine steps</h2>
               
                

            
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


