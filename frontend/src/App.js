import React, {useState} from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Header from './Components/Header';


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
      <Header loggedIn={loggedIn} logoutFunction={logoutFunction}/>
        <BrowserRouter>
          <Route exact path="/">
            {loggedIn ? <Profile/> : <Home/> }
          </Route>
          <Route exact path="/sign-up">
            {loggedIn ?  <Redirect to='/' /> : <Signup/> }
          </Route>
          <Route exact path="/login">
            {loggedIn ? <Redirect to='/' /> : <Login loginFunction={logInFunction}/> }
          </Route>
          <Route exact path="/profile">
            {loggedIn ?  <Profile/> : <Login loginFunction={logInFunction}/> }
          </Route>
        </BrowserRouter>
    </div>
  );
}

export default App;
