import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddPopover from './AddPopover';
import EditPopover from './EditPopover';

export class FetchUsers extends Component {
    static displayName = FetchUsers.name;

    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };

        this.populateUserData = this.populateUserData.bind(this);
        this.forceRefetch = this.forceRefetch.bind(this);
      
    }


    componentDidMount() {
        this.populateUserData(false);
    }


    forceRefetch() {
        console.log("refetch pls");
        this.populateUserData(false);
    }


    deleteUser(id) {
        fetch('api/user/' + id, { method: 'DELETE' }).then(response => {
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
         const users = this.state.users;
         users.splice(index, 1);
         fetch('api/user/' + index, { method: 'DELETE' });
         this.setState({users: users, loading: true});

     }
    async populateUserData(bool) {
        const response = await fetch('api/user');
        const data = await response.json();
        this.setState({ users: data, loading: bool });
    }

    

    renderUsersTable(users) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Phone</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>E-Mail</th>
                        <th>
                            <AddPopover refetch={this.forceRefetch}>

                            </AddPopover>
                        </th>                       
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td> 
                            <td>{user.phone}</td>
                            <td>{user.firstname + " " + user.lastname}</td>
                            <td>{user.company}</td>
                            <td>{user.email}</td>
                            <td>
                                <Grid 
                                container
                                direction="row"
                                justify="center"
                                alignItems="center">
                                    
                                   <EditPopover onCloseFunc={this.forceRefetch} user={user}>

                                   </EditPopover>
                                    <IconButton 
                                    color="secondary" 
                                    aria-label="Slet"
                                    index={user.id}
                                    onClick={(e) => this.deleteUser(user.id, e)}
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
            : this.renderUsersTable(this.state.users);

        return (
            <div>
                <h1 id="tabelLabel" >User Database</h1>
                <p>Temporary database of users  .</p>
                {contents}
            </div>
        );
    }


}