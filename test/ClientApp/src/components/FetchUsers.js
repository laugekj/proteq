import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { render } from 'react-dom';

function deleteUser(id) {
        console.log('Deleted succesfully' , 'deleted');
        fetch('api/user/' + id, { method: 'DELETE' });
        
     }
export class FetchUsers extends Component {
    static displayName = FetchUsers.name;

     

    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };
    }

    componentDidMount() {
        this.populateUserData();
    }

    async populateUserData() {
        const response = await fetch('api/user');
        const data = await response.json();
        this.setState({ users: data, loading: false });
    }

    

    static renderUsersTable(users) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Phone</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>E-Mail</th>
                    
                        
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td> 
                            <td>{user.phone}</td>
                            <td>{user.name}</td>
                            <td>{user.company}</td>
                            <td>{user.email}</td>
                            <td>
                            <Button onClick={() => deleteUser(user.id)}>Delete</Button>
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
            : FetchUsers.renderUsersTable(this.state.users);

        return (
            <div>
                <h1 id="tabelLabel" >User Database</h1>
                <p>Temporary database of users  .</p>
                {contents}
            </div>
        );
    }


}