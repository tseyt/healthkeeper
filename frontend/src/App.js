import React, {useState} from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Header from './Components/Header';
import SideHeader from './Components/SideHeader';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function logInFunction(){
    setLoggedIn(true);
  }

  function logoutFunction(){
    setLoggedIn(false);
  }

  return (
    <div className="App">
        <BrowserRouter>
          <Route exact path="/">
            <Header loggedIn={loggedIn} logoutFunction={logoutFunction}/>
            {loggedIn ? <Profile/> : <Home/> }
          </Route>
          <Route exact path="/sign-up">
            <Header loggedIn={loggedIn} logoutFunction={logoutFunction}/>
            {loggedIn ?  <Redirect to='/' /> : <Signup/> }
          </Route>
          <Route exact path="/login">
            <Header loggedIn={loggedIn} logoutFunction={logoutFunction}/>
            {loggedIn ? <Redirect to='/' /> : <Login loginFunction={logInFunction}/> }
          </Route>
          <Route exact path="/profile">
            <SideHeader loggedIn={loggedIn} logoutFunction={logoutFunction}/>
            {loggedIn ?  <Profile/> : <Home/> }
          </Route>
        </BrowserRouter>
    </div>
  );
}

export default App;
