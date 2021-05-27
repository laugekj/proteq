import { Typography, Container, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import HtmlRender from './Htmlrender';
import { FilesToDownload } from '../Steps/FilesToDownload';
import './Design1.css';

export default function Design1() {
    //TODO: get title, body, list from server FETCH :D :D :D
    const [step, setStep] = useState([])
    const [title, setTitle] = useState("Title") 
    const [body, setBody] = useState("Body")
    const [subTitle, setSubTitle] = useState("Fakta")
    const [video, setVideo] = useState(null)
    const [user, setUser] = useState()
   


    const urlstring = window.location.href;
    const id = urlstring.split('?')[1];
  
    function getStep() {
        fetch('api/file/' + id, { method: 'GET' }).then(response => {
            return response.json();
        })
        .then((responseJson) => {
           setStep(responseJson);
           setBody(responseJson.body);
           
         
           
           
        });
     }

     useEffect(()=> {
        // get STEP
        getStep()

        // get USER
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
     }, []);

     function CompleteStep() {
        
        // TODO: put step in UserStep table as completed
  
            const userStep = { UserId: user.id, StepId: id };
            fetch('api/userstep', {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userStep),
            }).then(response => {
                console.log(response);
                // 200 is "ok" (success)
                if(response.status === 200) {
                    console.log("Created userStep", userStep);
                } else {
                   // Error handling and
                   // Delete the User from Users Table if the email already existed
                
                }
        });

       window.location.href = '/dashboard'
          
    }


// if user is not logged in

   
    if (step.designId === 0) {

        return (
            <Container>
                <Grid 
                    container
                    direction="col"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Typography variant="h3"
                                display="block"
                                className="overskrift"
                            >
                                {step.title}
                        </Typography>
                    </Grid>
                 
                    <Grid item xs={12}>
                        <HtmlRender htmlString={step.body ? step.body : "empty"} />
                    </Grid>
                </Grid>
                <FilesToDownload />
                <Button onClick={CompleteStep}>Complete Step</Button>
            </Container>            
        );
    } else {
        return (
            <Container>
                <div className="outerdiv">
             <h1 class="overskrift">{step.title}</h1>
             <div className="videodiv">
             <iframe class="video" width="600" height="350" src={step.video} title="YouTube video player" frameborder="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
             </div>
             <div className="bodydiv">
             <HtmlRender class="bodytext" htmlString={body ? body : "empty"} />
             </div>
             <div className="buttondiv">
             <Button onClick={CompleteStep}>Complete Step</Button>
             </div>
             <div className="downloaddiv">
             <FilesToDownload />
             </div>
                </div>
             </Container>
             
                 
                
                        
         );
    }
}

