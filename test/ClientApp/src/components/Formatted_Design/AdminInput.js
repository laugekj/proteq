import { Typography, Container, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import parse from "html-react-parser";
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import HtmlRender from './Htmlrender';
import AttachDocument from './AttachDocument';
import './AdminInput.css';

export default function AdminInput() {
    const [header, setHeader] = useState("")
    const [body, setBody] = useState("")
    const [point, setPoint] = useState("")
    const [video, setVideo] = useState("")
    const [bulletPoints, setBulletPoints] = useState([])

    const addItem = event => {
        event.preventDefault();
        setBulletPoints([
          ...bulletPoints,
          {
            id: bulletPoints.length,
            name: point
          }
        ]);
        setPoint("");
        
      };

    return (
        
        <Container>
            
              <HtmlRender htmlString={body}></HtmlRender>
            <Grid
            direction="column"
            justify="flex-start"
            alignItems="flex-start">
                 <Form>
                    <FormGroup>
                        <Label for="exampleHeader">Header</Label>
                        <Input 
                        value={header} 
                        onChange={e => setHeader(e.target.value)} 
                        name="header" 
                        id="exampleHeader" 
                        placeholder="Sæt din header" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="body">Body</Label>
                        <Input 
                        type="textarea" 
                        name="text" 
                        id="bodyText"
                        value={body} 
                        onChange={e => setBody(e.target.value)}  />
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="bulletPoint">Bulletpoint</Label>
                                <Input 
                                id="bulletPoint" 
                                placeholder="Input one bulletpoint at a time"
                                value={point}
                                onChange={e => setPoint(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="videoLink">Videolink</Label>
                                <Input 
                                id="videoLink" 
                                placeholder="Indsæt videolink"
                                value={video}
                                onChange={e => setVideo(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md={1}>
                            <Label id= "invisLabel" for="positionOfButton">Knap</Label>
                            <Button id="addBulletPoint" onClick={addItem}>Add</Button>
                        </Col>
                    </Row>
                    <List>
                        {generate(bulletPoints)}
                    </List>
                    <FormGroup>
                        <Label for="designSelect">Select Design</Label>
                        <Input type="select" name="select" id="designSelect">
                        <option>Design 1</option>
                        <option>Design 2</option>
                        <option>Design 3</option>
                        </Input>
                    </FormGroup>                        
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        <AttachDocument></AttachDocument>
                        </FormText>
                    </FormGroup>
                    <Button>Submit</Button>
                    </Form>
            

            </Grid>
            <iframe class="video" width="600" height="350" src={video} title="YouTube video player" frameborder="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Container>   
        
    );
}
function generate(list) {
    return (
        <Container>
            {list.map(element => {
                return (
                    <ListItemText primary={"- " + element.name} />
                )
            })}
        </Container>
    );
}
