import { Typography, Container, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';

export default function Design1() {
    const [title, setTitle] = useState("Hvad er persondata egentlig?") 
    const [body, setBody] = useState("Inden du går i gang, så snup en kop kaffe og et stykke chokolade til læsningen... hvis du ikke allerede har gjort det. Der er to typer af persondata. Almindelig persondata og følsom persondata. Og så er der CPR-nr. og strafbare forhold - de er i hver deres særlige kategori. Det vender vi tilbage til i step 3.")
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