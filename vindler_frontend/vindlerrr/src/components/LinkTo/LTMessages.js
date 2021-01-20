import React,{Component}  from 'react';
import {Link} from 'react-router-dom';
import message_icon from './images/message_icon.jpg';

class LTMessages extends Component{

   
    render(){

        return (

            <>

               <Link to='/Message'> <img className="message" src= {message_icon} alt="message icon"/> </Link>
            
            </>

            
                

            
        );
    }
}



export default LTMessages;