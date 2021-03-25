import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '195846337053-iqu57fc1hg1edggj4hcfeke9cb6oa5j2.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logget ud');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Log ud af Google"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;