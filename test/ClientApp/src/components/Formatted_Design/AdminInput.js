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
    constructor() {
        super();
        
        this.state = {
            designId: 0,
          };
        this.state = {
            header: "",
        };
        this.state = {
            body: "",
        };
        this.state = {
            video: "",
        };
        this.state = {
            files: [],
        };

        this.uploadToServer = this.uploadToServer.bind(this);
        this.onChange = this.onChange.bind(this);

      }


      uploadToServer = async (e) => {
        console.log("uploadToServer: ", this.state.files);
        const formData = new FormData();
        formData.append("designId", this.state.designId);
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

      /*uploadToServer = () => {
          const data = {DesignId: this.state.designId, Title: this.state.header, Body: this.state.body, Video: this.state.video, Files: this.state.files}
          console.log('[DEVELOPER MODE] UPLOAD TO SERVER FUNCTION CALLED!')
          fetch('api/file/uploadfile', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
          }).then(response => {
              console.log('SERVER RESPONSE: ', response)
          });
      }*/
      onChange(e) {
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        this.setState({ files: [...this.state.files, ...filesArr] });
    
      }
      
      removeFile(f) {
           this.setState({ files: this.state.files.filter(x => x !== f) }); 
      }

      render() {
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
                                <Label for="bulletPoint">Bulletpoint</Label>
                                <Input 
                                id="bulletPoint" 
                                placeholder="Input one bulletpoint at a time"
                                value={this.state.point}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="videoLink">Videolink</Label>
                                <Input 
                                id="videoLink" 
                                placeholder="Indsæt videolink"
                                value={this.state.video}
                                onChange={e => this.setState({ video: e.target.value})} />
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
                            <input type="file" multiple onChange={this.onChange} />
                            <i className="fa fa-cloud-upload" /> Tilføj dokument
                            </label>
                            {this.state.files.map(x => 
                            <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>
                            )}
                        </div>                        
                        </FormText>
                    </FormGroup>
                    <Button onClick={this.uploadToServer}>Submit</Button>
                    </Form>
            

            </Grid>
            <iframe class="video" width="600" height="350" src={this.state.video} title="YouTube video player" frameborder="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Container>          
    );
}
}

