import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
export class google extends Component {
    static displayName = google.name;


    responseGoogle=(response)=> {
        console.log(response);
        console.log(response.profileObj)
      }
      
  

  render () {
    return (
      <div>
        <GoogleLogin
          clientId="195846337053-iqu57fc1hg1edggj4hcfeke9cb6oa5j2.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
    
          />
      </div>
    );
  }
}
