import React,{Component}  from 'react';
import SideBarUserList from './SideBarUserList';
import Chat from './Chat';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';





class Message extends Component {

  static propTypes = {
    mdl:  PropTypes.object.isRequired,
  }


  render(){

    const {displaychat} = this.props.mdl;

    const displayNoConvo = (
      <h3  style = {nullStyle} >No Active Conversation</h3>
    );

    return (

      <>

      <div style={{position:"fixed", zIndex:"700"}}>

        <SideBarUserList/>

        {displaychat ? <Chat/>:displayNoConvo}


      </div>

      
      
      
      </>
      
     
    
    );
  
  }
 
}


const nullStyle = {

  color: "black", 
  position: "relative",
  marginTop: "200px", 
  left:"660px",
  fontSize:"35px",
  fontFamily: "'Courgette', cursive"

}

const mapStateToProps =  state => ({
  mdl: state.messagedisplaylogicReducer,
});


export default  connect(mapStateToProps,null)(Message);
