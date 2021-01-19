import React,{Component, Fragment}  from 'react';
import {Link, Redirect} from 'react-router-dom';
import ProfilePicture from './ProfilePicture';
import defaultp from './defaultp.jpg'
import {connect} from 'react-redux';
import {getVindles, deleteVindle, getUserVindles} from '../../actions/vindles';
import PropTypes from 'prop-types';
import moment from 'moment';

export class Post extends Component {

    static propTypes = {
        vindles:PropTypes.array.isRequired,
        getVindles: PropTypes.func.isRequired, 
        deleteVindle:PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        getUserVindles: PropTypes.func.isRequired,
    }
 
    componentDidMount(){ 
        this.props.getVindles();
    } 
    // vindle.time_posted

    onClick =(username) => {
        <Redirect 
            to={
                `/Profile/${username}`
            }
        />

    }

    render(){

        //window.location.href=``
 
        const {user} = this.props.auth;
        //<Link style={{ textDecoration: 'none' }} to={`/Profile/${vindle.name}`}></Link> onClick={() => this.onClick(vindle.name)}
        // user_name = {vindle.name === user.username ? user.username: vindle.name }

        // <ProfilePicture />

        // reverse()

        return (
            <Fragment>
                {  this.props.vindles.map( vindle =>(
                    <div id = "postDiv">
                        <p> <div id = "profilepicture"><img id ="pp" src={vindle.image} /></div>   <Link style={{ textDecoration: 'none' }} to={`/Profile/${vindle.name}`}><h2 className="nameHighlight"  style={nameStyle}> {vindle.name.charAt(0).toUpperCase()+vindle.name.slice(1)}</h2></Link></p>
                        <small  style={smallStyle}>{moment(vindle.time_posted).startOf('seconds').fromNow()}</small>
                        <hr/>
                        <h4 className="textStyle" >
                            {vindle.post}
                        </h4>
                        
                        { user.id === vindle.owner ? <button onClick={this.props.deleteVindle.bind(this,vindle.id)} id="postdelete">X</button>: null}
                        
                    </div>
                ))}
            </Fragment>
        );
    }

    
}

const smallStyle = {

    color: "black", 
    float:"right",
    position:"relative",
    top: "-25px",

}

const nameStyle = {

    color: "black", 
    position: "relative",
    top: "45px",/*30px*/ 
    left:' 10px',

}

const mapStateToProps =  state => ({
    vindles: state.vindleReducer.vindles,
    auth: state.authReducer
});

export default connect(mapStateToProps, {getVindles, deleteVindle,getUserVindles})(Post); 