import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Header from './Components/Header';
import SideHeader from './Components/SideHeader';


class App extends React.Component {

  constructor(props) {
    // Inherit constructor
    super(props);
    // State for showing/hiding components when the API (blockchain) request is loading
    this.state = {
      loading: true,
      loggedIn: false,
    };
    // Bind functions
    this.loadUser = this.loadUser.bind(this);
    this.handlePatientAccess = this.handleSignForAccess.bind(this);
    // Call `loadUser` before mounting the app
    this.loadUser();
  }

  handlePatientAccess() {
    // Send a request to API (blockchain) to start game
    // And call `loadUser` again for react to render latest game status to UI
    return ApiService.patientAccess().then(()=>{
      return this.loadUser();
    });
  }

  render() {
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
  
}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(App);
