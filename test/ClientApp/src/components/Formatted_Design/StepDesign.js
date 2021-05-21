import { Typography, Container, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import HtmlRender from './Htmlrender';

export default function StepDesign() {
    //TODO: get title, body, list from server FETCH :D :D :D
    const [title, setTitle] = useState("Title") 
    const [body, setBody] = useState("Body")
    const [subTitle, setSubTitle] = useState("Fakta")
    const [video, setVideo] = useState("https://www.youtube.com/embed/u2lsSaDrjfA")
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
        getStep()

     });
   
     function nextStep() {
        window.location.href = '/step?' + (parseInt(id) + 1)
        // TODO: put step in UserStep table as completed
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