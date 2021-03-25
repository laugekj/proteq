import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

// refresh token
//import { refreshTokenSetup } from '../utils/refreshToken';



function createUser(name, id, email, token){
    const data = {  Name: name, d: id ,Email: email, Token: token };
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

const clientId =
  '195846337053-iqu57fc1hg1edggj4hcfeke9cb6oa5j2.apps.googleusercontent.com';

  function Login() {
    const history = useHistory();
    const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    createUser(res.profileObj.name, res.profileObj.googleid, res.profileObj.email, res.getAuthResponse().id_token);
    //alert( `Velkommen ${res.profileObj.name}` );
    history.push("/googleLogout");

 //   refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Ikke logget ind`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Log ind med Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;