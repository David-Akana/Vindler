import React,{Component}  from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import SearchEngine from './SearchEngine';
import {closeDiv} from '../../actions/search';
import HomeProfilePicture from '../PostFile/HomeProfilePicture';


class Header extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        closeDiv:PropTypes.func.isRequired  
    };

    onClick = () =>{
        this.props.closeDiv();
    }

    render (){

        const {user} = this.props.auth;

        const {toggle_div, user_info} = this.props.search;


        this.displaySearch= toggle_div ? "display-search" : "display-none-search";

        //

        //{this.displaySearch} 
        
        return (

            <>

          
                <ul id = "ul_1">
                    <Link to='/'><li className="l_h"><a href="/">Vindler</a></li></Link>
                    <Link to='/'><li className="l_1"><a href="/">Home</a></li></Link>
                    <Link to='/Message'><li className="l_1"><a href="/">Messages</a></li></Link>
                    
                    <SearchEngine/>

                    <div className={this.displaySearch}>
                
                     {user_info.map(info =>( <Link style={{ textDecoration: 'none', color:"white" }} to={`/Profile/${info.username}`}><p onClick={this.onClick}style={{textAlign:"center",fontFamily:"'PT Serif', serif;"}}> {info.username}</p></Link> ))}   
                
                    </div>
                      
                    <Link to={`/Profile/${user.username}`}><li className="headerProfileImage"> <HomeProfilePicture/></li></Link>
                </ul>

                <ul id = "ul_small">
                    <Link to='/'><li className="l_1_small"><a href="/">Home</a></li></Link>
                    <Link to='/Message'><li className="l_1_small"><a href="/">Messages</a></li></Link>
                    <Link to={`/Profile/${user.username}`}><li className="l_1_small"><a href="/">Profile</a> </li></Link>
                </ul>
                
                

                

         

            
            </>
         
        );
   } 

} 

const mapStateToProps = state =>({
    auth: state.authReducer,
    profilepicture: state.profilepictureReducer,
    search: state.searchReducer
});

export default  connect(mapStateToProps,{closeDiv})(Header);
