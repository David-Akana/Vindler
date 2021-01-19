import React,{Component}  from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import profile_icon from './images/profile_icon.png';

class LTProfile extends Component{

    static propTypes = {
        auth: PropTypes.object.isRequired,
        
    };

   // <Link to={`/Profile/${user.username}`}></Link>
    render(){

        const {user} = this.props.auth;

        return (

            <>

             <Link to={`/Profile/${user.username}`}><img className="profile" src= {profile_icon} alt="profile icon"/> </Link>
            
            </> 
        );
    }
}

const mapStateToProps = state =>({
    auth: state.authReducer,
});

export default connect(mapStateToProps)(LTProfile);