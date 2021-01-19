import React,{Component}  from 'react';
import {Link} from 'react-router-dom';
import home_icon from './images/home_icon.png';

class LTHome extends Component{

   
    render(){

        return (

            <>
             <Link to='/'><img className="home" src= { home_icon} alt="home icon"/> </Link>
            </>
    
        );
    }
}



export default LTHome;