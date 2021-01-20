import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { HashRouter as Router, Route, Switch} from 'react-router-dom'; // HashRouter BrowserRouter
import{Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { connect } from "react-redux";
import PropTypes from "prop-types";
// -----------------------------------------------------------
import Header from './components/HeaderFile/Header';
import AuthTypeLoginPage from './components/SingleFile/AuthTypeLoginPage';
import FaceLoginPage from './components/SingleFile/FaceLoginPage';
import RegisterPage from './components/SingleFile/RegisterPage';
import UploadProfilePicture from './components/PostFile/UploadProfilePicture';
import Home from './components/SingleFile/Home';
import Umessage from './components/MessageFile/Umessage'; // under-construction : Umessage, finished-section: Message
import Profile from './components/SingleFile/Profile';
import PrivateRoute from './components/common/PrivateRoute';
import {loadUser} from './actions/auth';
import Alerts  from './components/Alerts';
import store from './store';
import './App.css';

if (window.innerWidth <= 600) {
  import('./smallScreen.css');
}

if (window.innerWidth >= 601 && window.innerWidth <= 900 ) {
  import('./mediumScreen.css');
}


//alert options 
 
const alertOptions = {
  timeout: 6000,
  position: 'top center'
}


class App extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  componentDidMount(){
    store.dispatch(loadUser());
  }


  render(){

    const {isAuthenticated} = this.props.auth;

    
//isAuthenticated? <Header/> :null}
    return ( 
      <>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate}{...alertOptions}>
              <Router>   

              {isAuthenticated? <Header/> :null}
              <Alerts/>            
                
                <Switch>
                  
                  <PrivateRoute exact path="/" component={Home}/>
                  <PrivateRoute exact path="/Message" component={Umessage}/>
                  <PrivateRoute exact path="/Profile/:userId"  component={Profile}/>
                  <PrivateRoute exact path="/UploadProfilePicture"  component={UploadProfilePicture}/>
                
                  <Route exact path="/Login" component={AuthTypeLoginPage}/>
                  <Route exact path="/FaceLogin" component={FaceLoginPage}/>
                  <Route exact path="/Register" component={RegisterPage}/>
                  
                 
                </Switch>
                                
              </Router>
          </AlertProvider>
        </Provider>
        
      </>
    );
  }
}

const mapStateToProps = state =>({
  auth: state.authReducer
});

export default connect(mapStateToProps)(App);
