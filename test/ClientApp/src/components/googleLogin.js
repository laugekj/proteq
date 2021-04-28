import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import './Reset.css';

//import { refreshTokenSetup } from '../utils/refreshToken';



function createUser(Firstname, lastName, id, email, token){
    const data = {  Firstname: Firstname, lastName: lastName,  d: id ,Email: email, Token: token };
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

    const clientId = '195846337053-iqu57fc1hg1edggj4hcfeke9cb6oa5j2.apps.googleusercontent.com';

    function Login() {
    const [ user, setUser ] = useState();
    const [ loggedIn, setLoggedin ] = useState(false);
    const [ counter, setCounter ] = useState(0);


    const onLoginSuccess = (res) => {  
    setLoggedin(true);
    setCounter(counter + 1);
    console.log('Login Success: currentUser:', res.profileObj);
    setUser(res.profileObj);
    localStorage.setItem('user', JSON.stringify(res.profileObj));
    if (counter == 0) {
      createUser(res.profileObj.givenName, res.profileObj.familyName ,  res.profileObj.googleid, res.profileObj.email, res.getAuthResponse().id_token);
      }
    };
  
  const onLogoutSuccess = () => {
    console.log('Logout made successfully');
    alert('Logget ud');
    setLoggedin(false);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Ikke logget ind`
    );
  };

  return (
    <div>
     {loggedIn ? (<GoogleLogout
        classname ="googleLogIn"
        clientId={clientId}
        buttonText="Log ud af Google"
        onLogoutSuccess={onLogoutSuccess}
      />) : ( <GoogleLogin
        clientId={clientId}
        buttonText="Log ind med Google"
        onSuccess={onLoginSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
      />)}
     
    </div>
  );
}

export default Login;