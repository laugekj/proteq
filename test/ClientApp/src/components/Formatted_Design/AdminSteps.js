import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
//import AdminInput from './AdminInput';

export class AdminSteps extends Component {
    static displayName = AdminSteps.name;

    constructor(props) {
        super(props);
        this.state = { steps: [], loading: true };

        this.populateStepsData = this.populateStepsData.bind(this);
        this.forceRefetch = this.forceRefetch.bind(this);
      
    }


    componentDidMount() {
        this.populateStepsData(false);
    }


    forceRefetch() {
        console.log("refetch");
        this.populateStepsData(false);
    }


    deleteStep(id) {
        fetch('api/file/' + id, { method: 'DELETE' }).then(response => {
            console.log(response);
            // 200 is "OK" (success)
            if(response.status === 200) {
                this.forceRefetch();      
                console.log('Deleted succesfully' , 'deleted');
            }
            else {
                // Waaah, error handler
            }
        });
     }

     
     deleteRow(index) {
         const steps = this.state.steps;
         steps.splice(index, 1);
         fetch('api/file/' + index, { method: 'DELETE' });
         this.setState({steps: steps, loading: true});
     }


    async populateStepsData(bool) {
        const response = await fetch('api/file');
        const data = await response.json();
        this.setState({ steps: data, loading: bool });
    }

    editStep(id) {

        window.location.href = '/admininput?'+id
        console.log(id)
        //<AdminInput title="hello test"/>
    }

    renderStepsTable(steps) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Header</th>
                        <th>Body</th>
                        <th>VideoLink</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {steps.map(step =>
                        <tr key={step.id}>
                            <td>{step.id}</td> 
                            <td>{step.title}</td>
                            <td>{step.body}</td>
                            <td>{step.video}</td>
                          
                            
                            <td>
                                <Grid 
                                container
                                direction="row"
                                justify="center"
                                alignItems="center">
                                    <Button onClick = {() => this.editStep(step.id) }>Rediger Step</Button>

                                    <IconButton 
                                    color="secondary" 
                                    aria-label="Slet"
                                    index={step.id}
                                    onClick={(e) => this.deleteStep(step.id, e)}
                                    >
                                        <DeleteIcon />
                                        
                                    </IconButton>
                                </Grid>     
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
        
    }

    
 
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStepsTable(this.state.steps);

        return (
            <div>
                {contents}
  
            </div>
            
        );
    }


}