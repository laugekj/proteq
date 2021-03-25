import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { render } from 'react-dom';

function FetchUser() {
    fetch('api/user/1');
  }

export class Profile extends Component {
    static displayName = Profile.name;
    constructor(props) {
        super(props);
        this.state = { user: [],  loading: true };
    }

    async populateUserData() {
        const response = await fetch('api/user/1');
        const data = await response.json();
        this.setState({ user: data, loading: false });
    }
    
    static renderUser (user) {
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
                    {
                        <tr key={user.id}>
                            <td>{user.id}</td> 
                            <td>{user.phone}</td>
                            <td>{user.name}</td>
                            <td>{user.company}</td>
                            <td>{user.email}</td>
                            </tr>
                    }
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Profile.renderUser(this.state.user);

        return (
            <div>
                <h1 id="tabelLabel" >Profil</h1>
                <p>Brugeroplysninger</p>
                {contents}
            </div>
        );

    }


}
