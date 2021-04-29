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
import  DashBoard  from './components/DashBoard';
import Checkout from './components/Stripe/Checkout';
import { Success }  from './components/Stripe/Success';


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
            <Route path='/checkout' component={Checkout} />
            <Route path='/success' component={Success} />

     
      </Layout>
    );
  
}

