import { Typography, Container, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';
import React, { useState } from 'react';

export default function Design1() {
    //TODO: get title, body, list from server FETCH :D :D :D


    const [title, setTitle] = useState("Hvad er persondata egentlig?") 
    const [body, setBody] = useState("Inden du g�r i gang, s� snup en kop kaffe og et stykke chokolade til l�sningen... hvis du ikke allerede har gjort det. Der er to typer af persondata. Almindelig persondata og f�lsom persondata. Og s� er der CPR-nr. og strafbare forhold - de er i hver deres s�rlige kategori. Det vender vi tilbage til i step 3.")
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