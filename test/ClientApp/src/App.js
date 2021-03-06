import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import 'fontsource-roboto';
import { FetchUsers } from './components/FetchUsers';
import  { Profile } from './components/Profile';
import { Success }  from './components/Stripe/Success';
import   Dashboard  from './components/Dashboard/Dashboard';
import CheckoutRedirect from './components/Stripe/CheckoutRedirect';
import RequestResetPassword from './components/RequestResetPassword';
import ResetPassword from './components/ResetPassword';
import {Logout} from './components/Logout/Logout';
import Design1 from './components/Formatted_Design/Design1';
import {AdminInput} from './components/Formatted_Design/AdminInput';
import { AdminSteps } from './components/Formatted_Design/AdminSteps';

export default function App(){

    return (
      <Layout>    
        <Route exact path='/' component={Home} />
            <Route path='/fetch-users' component={FetchUsers} />         
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/profile' component={Profile} />
            <Route path='/success' component={Success} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/checkoutredirect' component={CheckoutRedirect} />
            <Route path='/requestresetpassword' component={RequestResetPassword} />
            <Route path='/resetpassword' component={ResetPassword} />
            <Route path='/logout' component={Logout} />
            <Route path='/design1' component={Design1} />
            <Route path='/admininput' component={AdminInput} />
            <Route path='/adminsteps' component={AdminSteps} />



            
      </Layout>
    );
  
}

