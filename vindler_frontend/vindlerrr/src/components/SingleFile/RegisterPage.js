import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

//<div className = 'recognition_div'></div>
// <p style={{marginLeft:"590px",marginTop:"60px",textDecoration:"underline",color:"darkmagenta"}}>Registeration Form</p>

export class RegisterPage extends Component {

    state = {
        username: "",
        password: "",
        password2: ""
    } 

    static propTypes ={
        regiser: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        const {username, password, password2} = this.state;
        if(password !== password2){
            this.props.createMessage({ passwordMisMatch: 'Passwords do not match!'})
        }else{
           
            this.props.register(username,password);
        }
    }


    onChange = e => this.setState({[e.target.name]: e.target.value});

    render(){

        if( this.props.isAuthenticated){
            return <Redirect to='/'/>;
        }

        const {username, password, password2} = this.state;

        return(
            <>
                    
                
                        <div className='registerFormDiv'>

                            <p className = 'register'>Registeration Form</p>

                            <form onSubmit={this.onSubmit}>
                            
                                <input 
                                    type="text" 
                                    className = 'register_input'
                                    name="username" 
                                    placeholder=" Username ( Other users will see this ) ... " 
                                    onChange={this.onChange}
                                    value={username} 
                                /><br/>
                                
                                <input 
                                    type="password" 
                                    className = 'register_input'
                                    name="password" 
                                    placeholder=" Password ... "
                                    onChange={this.onChange}
                                    value={password}
                                /><br/>
                                
                                <input 
                                    type="password" 
                                    className = 'register_input'
                                    placeholder=" Password Confirmation ... "
                                    name="password2" 
                                    onChange={this.onChange}
                                    value={password2}
                                    
                                /><br/>
                                
                                
                                <button className = 'registerButton' type="submit" >Register</button>
                                

                                <p className = 'LinkToLogin'>
                                Already have an account?   <Link to="/Login">Login</Link>
                                </p>

                            </form>


                        </div>
                        
                   
                
            </>
        )
    }
} 

const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps,{register, createMessage})(RegisterPage)