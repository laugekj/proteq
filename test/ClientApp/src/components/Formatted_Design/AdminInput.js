import { Typography, Container, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import axios from "axios";

import './AdminInput.css';
require('./AttachDocumentStyle.css');

const AttachDocumentStyle = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    display: 'flex',
  };

export function AdminInput() {

    const [ id, setId] = useState(-1)
    const [ designId, setDesignid] = useState(0)
    const [ header, setHeader] = useState("")
    const [ body, setBody] = useState("")
    const [ video, setVideo] = useState("")
    const [ files, setFiles] = useState([])

    useEffect(()=>{
        getStep();
    }, [id]);
    
    function getStep() {
        const urlstring = window.location.href;
        setId(urlstring.split('?')[1]);

        fetch('api/file/' + id, { method: 'GET' }).then(response => {
        return response.json();
    })
    .then((responseJson) => {
        setHeader(responseJson.title)
        setBody(responseJson.body)
        setDesignid(responseJson.designId)
        setVideo(responseJson.video)
        
    });
    }

    function submit(){
        
        if(this.state.id > -1) {
            console.log("Editing step")
        }
        else{
            console.log("Creating step")
        }
    }


    function uploadToServer (){
        console.log("uploadToServer: ", files);
        const formData = new FormData();
        formData.append("designId", designId);
        formData.append("title", header);
        formData.append("body", body);
        formData.append("video", video);

        for (let i = 0; i < files.length; i++) {
            formData.append("formFiles", files[i]);
        }

        formData.append("formFiles", files);
        try {
          const res =  axios.post("http://localhost:5000/api/file/CreateStep", formData);
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
      }
      function onChange(e) {
        setFiles(e.target.files); 
        var filesArr = Array.prototype.slice.call(files);
        setFiles([...files, ...filesArr])
        //this.setState({ files: [...this.state.files, ...filesArr] });
    
      }
      
      function removeFile(f) {
          setFiles(files.filter(x => x !== f))
           //this.setState({ files: this.state.files.filter(x => x !== f) }); 
      }
      return (
        <Container>
           
          
        <Grid
            direction="column"
            justify="flex-start"
            alignItems="flex-start">
                 <Form>
                    <FormGroup>
                        <Label for="exampleHeader">Header</Label>
                        <Input 
                        value={header} 
                        onChange={(e) =>  setHeader(e.target.value)}
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
                        onChange={(e) => setBody(e.target.value)}  />
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                           
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
                            <Button id="addBulletPoint">Add</Button>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="designSelect">Select Design</Label>
                        <Input type="select" name="select" id="designSelect" onChange={e => this.setState({ designId: e.target.selectedIndex})}>
                        <option>Design 1</option>
                        <option>Design 2</option>
                        <option>Design 3</option>
                        </Input>
                    </FormGroup>                        
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            <div style={AttachDocumentStyle}>
                            <label className="custom-file-upload">
                            <input type="file" multiple onChange={onChange} />
                            <i className="fa fa-cloud-upload" /> Tilføj dokument
                            </label>
                            {files.map(x => 
                            <div className="file-preview" onClick={removeFile.bind(this, x)}>{x.name}</div>
                            )}
                        </div>                        
                        </FormText>
                    </FormGroup>
                    <Button onClick={uploadToServer}>Submit</Button>
                    </Form>
            

            </Grid>
            <iframe class="video" width="600" height="350" src={video} title="YouTube video player" frameborder="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Container>          
    );
}

