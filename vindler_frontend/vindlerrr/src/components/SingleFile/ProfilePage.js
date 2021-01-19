import React,{Component, Fragment}  from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { getUserVindles,deleteVindle } from "../../actions/vindles";
import { displayuploaddiv,closeuploaddiv } from "../../actions/profilepicture";
import ProfilePicture from "../PostFile/ProfilePicture";
import UploadProfilePicture from "../PostFile/UploadProfilePicture";
import Pen from "../PostFile/Pen";
import moment from 'moment';
import {Link} from 'react-router-dom';




export class ProfilePage extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        vindles:PropTypes.array.isRequired,
        deleteVindle:PropTypes.func.isRequired,
        getUserVindles: PropTypes.func.isRequired,
        displayuploaddiv: PropTypes.func.isRequired,
        closeuploaddiv: PropTypes.func.isRequired
    };
    /*<span><ProfilePicture/></span>*/
   
    componentDidMount(){

        this.props.getUserVindles(this.props.username);
    
    }

    onClick =()=>{
        this.props.displayuploaddiv()
    }

    onClick2 =() =>{
        this.props.closeuploaddiv()
    }


    render(){

        const {isAuthenticated, user} = this.props.auth;

        const authLink = (
            <button className='logOutButton' onClick={this.props.logout}>Logout</button>
        );

        const smallAuthLink = (
            <button className='smallScreen-lob' onClick={this.props.logout}>Logout</button>
        );

        const uploadLink = (
            <button className='uploadButton' onClick={this.onClick}>Upload Picture</button>
        );
        
        const SmalluploadLink = (
            <button className='smallScreen-ub' onClick={this.onClick}>Upload Picture</button>
        );
        

        const {show_image_div} = this.props.profilepicture;


        this.displayupload= show_image_div ? "uploaddiv" : "none-uploaddiv";

        return (

            <>
              <div className="ProfileBody">

               
                    <span className='ppinprofilepage'><ProfilePicture user_name ={this.props.username}/></span>
                    <h3 className="userName">{`${this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}`}</h3>
                    <div className="verticleLine"> </div>
 

 
                    <div  className='smallScreenPortfolio'>
                        <span className="smallScreen-pp"><ProfilePicture user_name ={this.props.username}/></span>
                        <h3 className="smallScreen-un">{`${this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}`}</h3>
                        {isAuthenticated && user.username === this.props.username ? smallAuthLink:null}
                        {isAuthenticated && user.username === this.props.username ? SmalluploadLink:null}  
                        <Link to='/'><h4 className="smallScreen-bc" > Back</h4> </Link>                     
                    </div>

                    <hr className="horizontal"/>

        

                <Fragment>
                    {  this.props.vindles.reverse().map( vindle =>(
                        <div id = "userPostDiv">
                            <p> <h2 style={nameStyle}> {vindle.name.charAt(0).toUpperCase()+vindle.name.slice(1)}</h2> </p>
                            <small style={smallStyle}>{moment(vindle.time_posted).startOf('seconds').fromNow()}</small>
                            <hr/>
                            <h4 style={{marginLeft:'20px'}}>
                                {vindle.post}
                            </h4>
                            
                            { user.username === vindle.name ? <button onClick={this.props.deleteVindle.bind(this,vindle.id)} id="userPostdelete">X</button>: null}
                            
                        </div>
                    ))}
               </Fragment>



               <div className={this.displayupload}>
                 <button className="cancelUploadBtn" onClick={this.onClick2}>X</button>
                  <UploadProfilePicture/>
               </div>


                {isAuthenticated && user.username === this.props.username ? authLink:null}
                {isAuthenticated && user.username === this.props.username ? uploadLink:null}
            
                <Pen/>

              </div>
            </>
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
    top: "45px",
    left:'15px',
    padding:"0px",

}

const mapStateToProps = state =>({
    vindles: state.vindleReducer.vindles,
    auth: state.authReducer,
    profilepicture: state.profilepictureReducer,
    
});

export default connect(mapStateToProps,{logout,deleteVindle,getUserVindles, displayuploaddiv, closeuploaddiv})(ProfilePage);