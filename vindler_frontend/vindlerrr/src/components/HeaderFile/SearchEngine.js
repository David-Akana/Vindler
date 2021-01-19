import React,{Component}  from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {searchUser} from '../../actions/search';

class SearchEngine extends Component {

    state = {
        name:""
    }  

    static propTypes = {

        search: PropTypes.object.isRequired,
        searchUser:PropTypes.func.isRequired   
    };


    onChange = e => this.setState({[e.target.name]:e.target.value});

    // <button className = 'header_button' type='submit' >Search</button>

    onSubmit = e =>{

        e.preventDefault();
        const {name} = this.state;
        const username = name;
        this.props.searchUser(username);

        this.setState({
            name:""
        });

    };


    
    

    render (){

        const {name} =  this.state;
    
        return (
            
            <form onSubmit={this.onSubmit}  className = 'form_1'>
                <input  className = 'header_input'  type="search" name="name" value= {name} onChange={this.onChange} placeholder="   Name ...  " />
                
            </form>
            
        );
   } 

} 

const mapStateToProps = state =>({
    search: state.searchReducer
});

export default  connect(mapStateToProps,{searchUser})(SearchEngine);