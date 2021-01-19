import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { login } from '../../actions/auth';
//<div className = 'recognition_div'></div>
// <p style={{marginLeft:"590px",marginTop:"60px",textDecoration:"underline",color:"darkmagenta"}}>Registeration Form</p>

export class FaceLoginPage extends Component {

    state = {
        username: "",
        password: "",
    }


    static propTypes ={
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username,this.state.password);
        
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    render(){
        if( this.props.isAuthenticated){
            return <Redirect to='/'/>
        }

        const {username, password} = this.state;

        return(
            <>
                    
                
                <div className='loginFormDiv'>

                    <p className = 'login'>Login</p>

                    <form onSubmit={this.onSubmit}>
                    
                        <input 
                            type="text" 
                            className = 'login_input'
                            name="username" 
                            placeholder=" Username ... " 
                            onChange={this.onChange}
                            value={username} 
                        /><br/>
                        
                        <input 
                            type="password" 
                            className = 'login_input'
                            name="password" 
                            placeholder=" Password ... "
                            onChange={this.onChange}
                            value={password}
                        /><br/>
                        
                    
                        
                        <button className = 'loginButton' type="submit" >Login</button>
                        

                        <p className = 'LinkToRegister'>
                        No account?   <Link to="/Register">Register</Link>
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

export default connect(mapStateToProps,{login})(FaceLoginPage)