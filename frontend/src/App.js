import React from 'react';
import { connect } from 'react-redux';
import { UserAction } from './actions';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
//import {ApiService} from 'services';

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
      loading: false,
      loggedIn: false,
    };
  }
  
  render() {
    const { user: { name, patient_id } } = this.props;
    
    const loggedIn = (name == "") ? false : true;

    return (
      <div className="App">
          <BrowserRouter>
            <Route exact path="/">
              <Header loggedIn={loggedIn}/>
              {loggedIn ? <Profile/> : <Home/>}
            </Route>
            <Route exact path="/login">
              <Header loggedIn={loggedIn}/>
              {loggedIn ? <Redirect to="/"/> : <Login/> }
            </Route>
            <Route exact path="/profile">
              <SideHeader loggedIn={loggedIn}/>
              {loggedIn ? <Profile/> : <Home/> }
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
