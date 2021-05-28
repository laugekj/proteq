import { Container, Grid, Button } from '@material-ui/core';
import React from 'react';
import { Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import axios from "axios";
import StepFilesButton from './StepFilesButton';


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
            URLstepId: -1,
            designId: 0,
            stepNumber: 0,
            header: "",
            body: "",
            video: "",
            files: [],
            isLoggedIn: false,
            isAdmin: false,
          };

        this.uploadToServer = this.uploadToServer.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getStep = this.getStep.bind(this);
      }
      
      componentDidMount() {
        const urlstring = window.location.href;
        var stepId = -1
        stepId = urlstring.split('?')[1]

        if (stepId >= 0) {
        this.state.URLstepId = stepId;
        this.getStep(stepId);
        }

        var loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            this.setState({isLoggedIn: true});
            var foundUser = JSON.parse(loggedInUser);
            var foundUserIsAdmin = JSON.parse(foundUser.isAdmin);
            this.setState({isAdmin: foundUserIsAdmin});
    }
    }

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
            video: json.video,
            stepNumber: json.stepNumber
        });
       }



      uploadToServer = async (e) => {
        console.log("uploadToServer: ", this.state.files);
        const formData = new FormData();
        formData.append("designId", this.state.video ? 1 : this.state.designId);
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
          alert('Oprettet trin');
            window.location.href = '/dashboard'
        } catch (ex) {
          console.log(ex);
          alert('Noget gik galt. Prøv igen');
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

      editStepFromServer = async () => {

        const formData = new FormData();
        formData.append("id", this.state.URLstepId);
        formData.append("designId", this.state.video ? 1 : 0);
        formData.append("stepNumber", this.state.stepNumber);
        formData.append("title", this.state.header);
        formData.append("body", this.state.body);
        formData.append("video", this.state.video);

        for (let i = 0; i < this.state.files.length; i++) {
            formData.append("formFiles", this.state.files[i]);
        }

        formData.append("formFiles", this.state.files);
        try {
          const res = await axios.put("http://localhost:5000/api/file/UpdateStep", formData);
          console.log(res);
          alert('Redigeret trin');
            window.location.href = '/dashboard'
        } catch (ex) {
          console.log(ex);
          alert('Noget gik galt. Prøv igen');
          
        }
      }

      submit = (e) => {
        e.preventDefault();
        if (this.state.URLstepId >= 0) {
            this.editStepFromServer();
            
            } else {
            this.uploadToServer();
            
        }
      }

      render() {
        if (this.state.isLoggedIn) {
            if (this.state.isAdmin) {   
    return (
        <Container>
        <Grid
            direction="column"
            justify="flex-start"
                alignItems="flex-start">
                <h1 class = "adminTitle" >Indsæt et step</h1>
                 <Form>
                 <FormGroup>
                        <Label for="exampleHeader">Step nr.</Label>
                        <Input class="adminInput"
                        value={this.state.stepNumber} 
                        onChange={e =>  this.setState({ stepNumber: e.target.value})} 
                        name="stepnr" 
                        id="examplestepnr" 
                        placeholder="Vælg step nr." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleHeader">Titel</Label>
                        <Input 
                        value={this.state.header} 
                        onChange={e =>  this.setState({ header: e.target.value})} 
                        name="header" 
                        id="exampleHeader" 
                        placeholder="Sæt din header" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="body">Brødtekst</Label>
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
                    <div>
                    <StepFilesButton stepId={this.state.URLstepId}/>
                    </div>
                   <FormGroup>
                        <Label for="exampleFile">Fil(er)</Label>
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
                    {this.state.URLstepId >= 0 ? (
                      <Button onClick={this.submit}>Gem step</Button>
                    ) : (
                      <Button onClick={this.submit}>Opret step</Button>
                    )}
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

