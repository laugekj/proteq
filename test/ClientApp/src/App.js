import React, { Component , useState, useMemo} from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import 'fontsource-roboto';
import { FetchUsers } from './components/FetchUsers';
import  googleLogin  from './components/googleLogin';
import  googleLogout  from './components/googleLogout';
import  { Profile } from './components/Profile';
import  { UserContext } from './components/UserContext';

export default function App(){

  const [userEmail, setUserEmail] = useState (null)
  const [userName, setUserName] = useState (null)
  const [userCompany, setUserCompany] = useState (null)
  const [counter, setCounter] = useState (0)
  const [loggedIn, setLoggedin] = useState (false)

  const user = useMemo (() => ({userEmail, setUserEmail, userName, setUserName, loggedIn, setLoggedin, counter, setCounter, userCompany, setUserCompany}), [userEmail, setUserEmail, userName, setUserName, loggedIn, setLoggedin, counter, setCounter]);

    return (
      <Layout>
      <UserContext.Provider value={user}>
        <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-users' component={FetchUsers} />         
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/googleLogin' component={googleLogin} />
            <Route path='/googleLogout' component={googleLogout} />
            <Route path='/profile' component={Profile} />
      </UserContext.Provider>
      </Layout>
    );
  
}

