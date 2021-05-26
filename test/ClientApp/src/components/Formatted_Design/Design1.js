import { Typography, Container, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import HtmlRender from './Htmlrender';

export default function Design1() {
    //TODO: get title, body, list from server FETCH :D :D :D
    const [title, setTitle] = useState("Title") 
    const [body, setBody] = useState("Body")
    const [subTitle, setSubTitle] = useState("Fakta")
    const [video, setVideo] = useState("https://www.youtube.com/embed/u2lsSaDrjfA")
    const [user, setUser] = useState()
    const designId = 1;


    const urlstring = window.location.href;
    const id = urlstring.split('?')[1];
  
    function getStep() {
        fetch('api/file/' + id, { method: 'GET' }).then(response => {
            return response.json();
        })
        .then((responseJson) => {
           setTitle(responseJson.title);
           setBody(responseJson.body)
           
        });
     }

     useEffect(()=> {
        // get STEP
        getStep()

        // get USER
        const loggedInUser = localStorage.getItem("user");
        console.log("const loggedInUser:")
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }

     }, []);
   
     function nextStep() {
        
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
   
    if (designId == 1) {
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
                                {title}
                        </Typography>
                    </Grid>
                 
                    <Grid item xs={12}>
                        <HtmlRender htmlString={body} />
                    </Grid>
                </Grid>
                <Button onClick={nextStep}>Next Step</Button>
            </Container>            
        );
    } else {
        return (
            <div>
             <h1 class="overskrift">{title}</h1>
             <h2 class="design2underoverskrift">{subTitle}</h2>
             <h3 class="design2text">{body}</h3>
             <iframe class="video" width="600" height="350" src={video} title="YouTube video player" frameborder="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     
            </div>
                 
                
                        
         );
    }
    
}