import React,{Component}  from 'react';
import Dialogue from './Dialogue';
import ProfilePicture from "../PostFile/ProfilePicture";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import webSocketInstance from './websocket';
import { isCompletionStatement } from '@babel/types';


class Chat extends Component {

  constructor() {
    this.socketRef = null;
  }

  state = {

  }

  waitForSocketConnection(callback){
    const component = this;
    setTimeout(
        function(){
            if (webSocketInstance.state() === 1){
                console.log('connection is secure');
                callback();
                return;

            } else{
              console.log('waiting for connection ...');
              component.waitForSocketConnection(callback)
            }

        }, 100 );
  }

 

  static propTypes = {
    mdl:  PropTypes.object.isRequired,
  }

  
  render(){

    //console.log(this.props.chatname)

    const {name} =  this.props.mdl

    


    return (

        <div>
          <div className="chatHeader"> <p> <span><ProfilePicture/></span>  <h3 style={nameStyle}> {name}</h3> </p></div>

           <Dialogue/>





          <div className="chatDiv">
              <form className="chat_form">
                  <input  className = 'chat_input' placeholder=' Start A New Conversation ...'/>
                  <button className = 'chat_button' type='submit' >Send</button>
              </form>
          </div>
        </div>

    );
  
  }
 
}

const nameStyle = {

  color: "white", 
  position: "relative",
  top: "3px",/*30px*/ 
  left:' 25px',

}

const mapStateToProps =  state => ({
  mdl: state.messagedisplaylogicReducer,
});


export default connect(mapStateToProps,null)(Chat);