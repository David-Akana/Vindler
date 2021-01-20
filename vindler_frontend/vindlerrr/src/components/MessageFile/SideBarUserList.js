import React,{Component}  from 'react';
import Users from './Users';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {closeDiv} from '../../actions/search';
import {searchMessageUserList} from '../../actions/search';
import {addtoMessageList} from '../../actions/vindlermessageslist';




class SideBarUserList extends Component {


  state = {
    name:""
}  

  static propTypes = {

      search: PropTypes.object.isRequired,
      searchMessageUserList:PropTypes.func.isRequired,
      addtoMessageList:PropTypes.func.isRequired

  };


  onChange = e => this.setState({[e.target.name]:e.target.value});



  onSubmit = e =>{

      e.preventDefault();
      const {name} = this.state;
      const username = name;
      this.props.searchMessageUserList(username);

      this.setState({
          name:""
      });

  };


  onClick = (username, username_id) =>{
    const messageuserlist = {username, username_id};
    this.props.addtoMessageList(messageuserlist)
    this.props.closeDiv();
  }

  
  render(){

    const {name} =  this.state;
    const {toggle_messages, for_messages_user_list} = this.props.search;
    this.displaySearch = toggle_messages ? "display-messagelist-search" : "display-none-messagelist-search";
  
    return (

      <>
        <div className="holdcontent"> 

          <div className="SearchUser">
              <form onSubmit={this.onSubmit} className="search_message_form">
                <input  className = 'search_message_input'  name="name" value= {name} onChange={this.onChange} placeholder='   Name of user ...'/>
              </form>
          </div>

          <div className={this.displaySearch}>
            {for_messages_user_list.map(info =>(<p onClick = {() => this.onClick(info.username,info.id)} style={{padding:"1.5px", marginLeft:"12px",fontFamily:"'PT Serif', serif;"}}> {info.username}</p> ))} 
          </div>
          
        </div>

        <div className="SideBar">

          
          <div className="UserMessages">

            <Users/>

          </div>


        </div>

      </>

    );
  
  }
 
}

const mapStateToProps = state =>({
  search: state.searchReducer,

});

export default connect(mapStateToProps,{searchMessageUserList,addtoMessageList, closeDiv})(SideBarUserList);