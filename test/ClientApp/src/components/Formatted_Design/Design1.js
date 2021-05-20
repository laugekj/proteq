import { Typography, Container, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';
import React, { useState } from 'react';

export default function Design1() {
    //TODO: get title, body, list from server FETCH :D :D :D

    const urlstring = window.location.href;
    const id = urlstring.split('?')[1];
  
    function getStep() {
        fetch('api/step/' + id, { method: 'GET' }).then(response => {
            return response.json();
        })
        .then((responseJson) => {
           setTitle(responseJson.title);
           setBody(responseJson.body)
           
        });
     }
   

    const [title, setTitle] = useState("Hvad er persondata egentlig?") 
    const [body, setBody] = useState("Inden du går i gang, så snup en kop kaffe og et stykke chokolade til løsningen... hvis du ikke allerede har gjort det. Der er to typer af persondata. Almindelig persondata og følsom persondata. Og så er der CPR-nr. og strafbare forhold - de er i hver deres særlige kategori. Det vender vi tilbage til i step 3.")
    const [bulletList, setBulletList] = useState(["bulletpoint 1","bulletpoint 2"])

    return (
        <Container>
            <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Typography variant="h3"
                    display="block"
                    class="overskrift"
                >
                    {title}
                </Typography>
                <Typography variant="body1">
                    {body}
                </Typography>
                <List>
                    <ListItem>
                        {generate(bulletList)}
                    </ListItem>
                </List>
            </Grid>
            <Button>Next Step</Button>
        </Container>            
    );
}

function generate(list) {
    return (
        <Container>
            {list.map(element => {
                return (
                    <ListItemText primary={"- " + element} />
                )
            })}
        </Container>
    );
}