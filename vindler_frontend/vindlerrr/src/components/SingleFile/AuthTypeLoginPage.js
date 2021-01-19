import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";

/* <div className = 'auth'>Voice Authentication</div> */

export class  AuthTypeLoginPage extends Component {

    static propTypes ={
        isAuthenticated: PropTypes.bool
    }
   

    render (){

        if (this.props.isAuthenticated){
            return <Redirect to='/'/>
        }

        
        return (      
            <>
            <div className='flex-container'>

                <div style={{backgroundColor: "darkmagenta"}}>

                    <h1 className ='landing_name' >Vindler</h1>
                    <h5 className ='brand_name' > Vindler Project ©  2020</h5>

                </div>

                <div style={{backgroundColor: "white"}}>

                    <h3 className='sign-in' > SIGN-IN </h3>

                    <Link style={{ textDecoration: 'none' }} to="/FaceLogin"><div className = 'auth'>Face Authentication </div></Link>
                
                
                </div>

            </div>

            </>
        );
   } 
}

const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(AuthTypeLoginPage);