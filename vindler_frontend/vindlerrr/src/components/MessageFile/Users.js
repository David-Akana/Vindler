import React,{Component, Fragment}  from 'react';
import ProfilePicture from "../PostFile/ProfilePicture";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getMessageList} from '../../actions/vindlermessageslist';
import {displaychat} from '../../actions/messagedisplaylogic';





class Users extends Component {

  state = {
    chatName:""
  
  }

  

  static propTypes = {
    vml: PropTypes.array.isRequired,
    getMessageList:PropTypes.func.isRequired,
    displaychat:PropTypes.func.isRequired,
  }

  componentDidMount(){ 
    this.props.getMessageList();
  }

  onClick =(name)=>{

    this.props.displaychat(name);

  }

  render(){

    


    return (

      <Fragment>
        {this.props.vml.reverse().map(vml => ( 
          <div className="userList">
          <div onClick={() => this.onClick(vml.username)} className="userCell"> <p> <span style={displayStyle}><ProfilePicture/></span>  <h3  style={nameStyle}>{vml.username}</h3> </p> </div>
          </div>
        ))}

      </Fragment>

    );
  
  }
 
}


const nameStyle = {

    color: "white", 
    position: "relative",
    top: "15px",
    left:"15px",

  }

  const displayStyle = {

    color: "white", 
    position: "relative",
    top: "-15px",
    left:"5px",
  
  }


const mapStateToProps =  state => ({
    vml: state.vindlermessageslistReducer.usermessagelist
});
export default connect(mapStateToProps,{getMessageList,displaychat})(Users);