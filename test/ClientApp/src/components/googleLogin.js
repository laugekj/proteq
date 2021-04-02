import React, { useState, useContext } from 'react';
import  { UserContext } from './UserContext';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

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
    const { userEmail, setUserEmail } = useContext(UserContext);
    const { userName, setUserName } = useContext(UserContext);
    const { loggedIn, setLoggedin } = useContext(UserContext);
    const { counter, setCounter } = useContext(UserContext);
    //const history = useHistory();


    const onLoginSuccess = (res) => {  
    setUserEmail(res.profileObj.email);
    setUserName(res.profileObj.name);
    setLoggedin(true);
    setCounter(counter + 1);
    console.log('Login Success: currentUser:', res.profileObj);
    if (counter == 0) {
      createUser(res.profileObj.givenName, res.profileObj.familyName ,  res.profileObj.googleid, res.profileObj.email, res.getAuthResponse().id_token);
      }
    //alert( `Velkommen ${res.profileObj.name}` );
    //history.push("/googleLogout");
    //refreshTokenSetup(res);
    };
  
  const onLogoutSuccess = () => {
    console.log('Logout made successfully');
    alert('Logget ud');
    setUserEmail(null);
    setUserName(null);
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