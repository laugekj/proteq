import { Typography, Container, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import axios from "axios";

import './AdminInput.css';
require('./AttachDocumentStyle.css');

const AttachDocumentStyle = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    display: 'flex',
  };

export class AdminInput extends React.Component {
    constructor(probs) {
        super(probs);
        
        this.state = {
            id: -1,
            designId: 0,
            stepNumber: 0,
            header: "",
            body: "",
            video: "",
            files: [],
            myFileNames: [],
            myFilesId: [],
            isLoggedIn: false,
            isAdmin: false
          };

        this.uploadToServer = this.uploadToServer.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getStep = this.getStep.bind(this);
        this.getAllFilesAssociatedToStepId = this.getAllFilesAssociatedToStepId.bind(this);

      }
      componentDidMount() {
        const urlstring = window.location.href;
        var stepId = -1
        stepId = urlstring.split('?')[1]

        if (stepId >= 0) {
        this.getStep(stepId);
        this.getAllFilesAssociatedToStepId(stepId);
        }

        var loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            this.setState({isLoggedIn: true});
            var foundUser = JSON.parse(loggedInUser);
            var foundUserIsAdmin = JSON.parse(foundUser.isAdmin);
            this.setState({isAdmin: foundUserIsAdmin});
    }
    }


    removeSelectedFile(arrayIndex) {
        var selectedFileId = this.state.myFilesId[arrayIndex];
    }

    getAllFilesAssociatedToStepId = async (stepId) => {
        const response = await fetch('api/download/GetAllFilesFromStepId/' + stepId, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        });

        const json = await response.json();
        json.forEach(obj => {
            this.state.myFileNames.push(obj.fileName);
            this.state.myFilesId.push(obj.id)
        }) 
    }
        
        /*.then(response => {
            console.log(response);

            response.json().then(json => 
                 json.forEach(obj => {
                    console.log(obj);
                    setMyFileNames( arr => [...arr, `${obj.fileName}`]);
                    setMyFilesId(arr => [...arr, `${obj.id}`]);
                }));
            });*/

      getStep = async (stepId) => {
            
        const response = await fetch('api/file/' + stepId, { 
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }});
        const json = await response.json();
         this.setState({
            header: json.title,
            body: json.body,
            designId: json.designId,   
            video: json.video
        });
       }



      uploadToServer = async (e) => {
        console.log("uploadToServer: ", this.state.files);
        const formData = new FormData();
        formData.append("designId", this.state.designId);
        formData.append("stepNumber", this.state.stepNumber);
        formData.append("title", this.state.header);
        formData.append("body", this.state.body);
        formData.append("video", this.state.video);

        for (let i = 0; i < this.state.files.length; i++) {
            formData.append("formFiles", this.state.files[i]);
        }

        formData.append("formFiles", this.state.files);
        try {
          const res = await axios.post("http://localhost:5000/api/file/CreateStep", formData);
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
      }

      onChange(e) {
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        this.setState({ files: [...this.state.files, ...filesArr] });
    
      }
      
      removeFile(f) {
           this.setState({ files: this.state.files.filter(x => x !== f) }); 
      }

      render() {
        if (this.state.isLoggedIn) {
            if (this.state.isAdmin){   
                console.log("HALLO", this.state.myFileNames);

    return (
        <Container>
        <Grid
            direction="column"
            justify="flex-start"
            alignItems="flex-start">
                 <Form>
                 <FormGroup>
                        <Label for="exampleHeader">Step nr.</Label>
                        <Input 
                        value={this.state.stepNumber} 
                        onChange={e =>  this.setState({ stepNumber: e.target.value})} 
                        name="stepnr" 
                        id="examplestepnr" 
                        placeholder="Vælg step nr." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleHeader">Header</Label>
                        <Input 
                        value={this.state.header} 
                        onChange={e =>  this.setState({ header: e.target.value})} 
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
                        value={this.state.body} 
                        onChange={e => this.setState({ body: e.target.value})}  />
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="videoLink">Videolink</Label>
                                <Input 
                                id="videoLink" 
                                placeholder="Indsæt videolink"
                                value={this.state.video}
                                onChange={e => this.setState({ video: e.target.value})} />
                            </FormGroup>
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
                            <input type="file" multiple onChange={this.onChange} />
                            <i className="fa fa-cloud-upload" /> Tilføj dokument
                            </label>
                            {this.state.files.map(x => 
                            <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>
                            )}
                        </div>                        
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <div>
                            {this.state.files.map(x => 
                            <div className="file-preview" onClick={e => this.removeSelectedFile(this)}>{x.name}</div>
                            )}
                        </div>                        
                    </FormGroup>
                    <Button onClick={this.uploadToServer}>Submit</Button>
                    </Form>
            </Grid>
            
        </Container>          
    );
} else {
    return (
        <div>Du har ikke adgang til siden.</div>
    );
} 
} else {
    return (
        <div>Du er ikke logget ind</div>
    );
}
    }
}

