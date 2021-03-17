import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { google } from './components/google';
import 'fontsource-roboto';
import { FetchUsers } from './components/FetchUsers';
import GoogleLogin from 'react-google-login'




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
      </Layout>
    );
  }
}
