import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import 'fontsource-roboto';
import { FetchUsers } from './components/FetchUsers';
import  googleLogin  from './components/googleLogin';
import  { Profile } from './components/Profile';
import { DashBoard } from './components/DashBoard';
import { Success }  from './components/Stripe/Success';
import  { Dashboard } from './components/Dashboard/Dashboard';
import CheckoutRedirect from './components/Stripe/CheckoutRedirect';
import RequestResetPassword from './components/RequestResetPassword';
import ResetPassword from './components/ResetPassword';
import {Logout} from './components/Logout/Logout';

export default function App(){

    return (
      <Layout>
      
        <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-users' component={FetchUsers} />         
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/googleLogin' component={googleLogin} />
            <Route path='/profile' component={Profile} />
            <Route path='/dashboard' component={DashBoard} />
            <Route path='/success' component={Success} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/checkoutredirect' component={CheckoutRedirect} />
            <Route path='/requestresetpassword' component={RequestResetPassword} />
            <Route path='/resetpassword' component={ResetPassword} />
            <Route path='/logout' component={Logout} />
      </Layout>
    );
  
}

