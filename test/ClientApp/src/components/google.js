import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

var counter = 0;
  function createUser(name, id, email){
    const data = {  Name: name, id: id ,Email: email };
    fetch('api/user', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  export class google extends Component {
    static displayName = google.name;

    responseGoogle=(response)=> {
        
        counter = counter + 1;
        console.log(response);
        console.log(response.profileObj);
        if (counter === 1) {
            createUser(response.profileObj.name, response.profileObj.googleid, response.profileObj.email);
        }
        
      }

      

  render () {
    return (
      <div>

        <GoogleLogin
          clientId="195846337053-iqu57fc1hg1edggj4hcfeke9cb6oa5j2.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          isSignedIn={true}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
    
          />
      </div>
    );
  }

  
}
