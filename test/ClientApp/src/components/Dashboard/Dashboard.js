
import React, { useState, useEffect} from 'react';
import './Dashboard.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StepStep from '../Steps/StepStep';
import { Container } from '@material-ui/core';



export default function Dashboard() {
  
 
    const [ user, setUser] = useState()
    const [steps, setSteps] = useState(null)
    const [progress, setProgress] = useState(0);
    


    

    useEffect(()=>{
  

        const loggedInUser = localStorage.getItem("user");
        console.log("const loggedInUser:")
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        
        // Get list of steps
            fetch('api/userstep/getsteps/' + foundUser.id)
              .then(response => response.json())
              .then(data => {
                setSteps(data)
                let cmpSteps = data.filter(x => x.completed === true);
                console.log("lengths=" + data.length + " " + cmpSteps.length)
                setProgress(cmpSteps.length/data.length * 100);
                console.log(progress);
              })

              
              
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
            <div className="body">
                <h1 className="overskrift">Velkommen, {user.firstname + " " + user.lastname} til SimpleGDPR!</h1>
                <p className="welcome">
                    Du er nu allerede tættere på målet om at få styr på GDPR. 
                    Det er et vigtigt skridt både for dine kunder, men også for din virksomhed. 
                    Du vil med tiden blive mødt af forespørgsler om din håndtering af GDPR. 
                    Det kan komme fra dine kunder, dine samarbejdspartnere eller en helt tredje. 
                    Og så er det dejligt, at du kan svare. Det kommer nemlig din forretning til gode på den lange bane.
                    Vi ønsker dig god fornøjelse og god arbejdslyst! Husk kaffe og chokolade på din vej.
                </p>
                <center>
                    <Button onClick = {() => window.location.href = '/' }>Hjem</Button>
                    <Button onClick = {() => window.location.href = '/Profile' }>Profilside</Button>
                </center>
                
            
                <h2 className="stepsInfo">Se dine fremskridt her:</h2>
                {console.log(steps)}
            
                
                <Container maxWidth="sm">
                    <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                            <LinearProgress variant="determinate" value={progress} />
                        </Box>
                    <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                    progress
                    )}%`}</Typography>
                        </Box>
                    </Box>
                </Container>
                
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

