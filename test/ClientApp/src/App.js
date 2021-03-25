import React, { Component } from 'react';
//import react from react;
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import 'fontsource-roboto';
import { FetchUsers } from './components/FetchUsers';
import { google } from './components/google';
import  googleLogin  from './components/googleLogin';
import  googleLogout  from './components/googleLogout';
import  { Profile } from './components/Profile';
//import { bindActionCreators } from 'redux';
//import { Redirect } from 'react-router-dom';
//import AuthMiddleware from 'modules/middlewares/AuthMiddleware';



// function requireAuth(){
//   replace({
//     pathname: "/login",
//     state: {nextPathname: nextState.location.pathname}
//   });
//   next();
// }


// function requireAuth2() {
//   if (!authenticated) {
//     replace({
//       pathname: "/login",
//       state: {nextPathname: nextState.location.pathname}
//     });
//   }
//   next();
// }
// onEnter={requireAuth}

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-users' component={FetchUsers} />         
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/google' component={google} />
            <Route path='/googleLogin' component={googleLogin} />
            <Route path='/googleLogout' component={googleLogout} />
            <Route path='/profile' component={Profile} />
      </Layout>
    );
  }
}
