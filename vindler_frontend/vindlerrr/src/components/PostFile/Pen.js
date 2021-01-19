import React,{Component}  from 'react';
import leaf_pen from './leaf_pen.png';
import CreatePost from './CreatePost';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {toggle} from '../../actions/cpd';
import { CSSTransition } from "react-transition-group";


// <CreatePost/>
class Pen extends Component{

    state = {
        /*showCPD: false,
        showmodal: false*/
    };

    static propTypes = {
        cpd: PropTypes.object.isRequired,
        toggle:PropTypes.func.isRequired
    }

    onClick = () =>{
        this.props.toggle();
    }

/*
    onClick = {() =>{this.switch();this.modaltoggle();}}    
*/
    render(){

        const {showCPD, showmodal} = this.props.cpd;

        this.displaymodal=showmodal ? "cpdmodal .display-block" : "cpdmodal .display-none";
   
        return (

            <>
            
                <button id ="pen_post" onClick = {this.onClick}> 
                    <img   id ="pen" src= {leaf_pen} alt="feather pen"/>  
                </button>

                

                    <CSSTransition
                        in={showCPD}
                        timeout={600}
                        classNames="cpd-transition"
                        unmountOnExit>

                      <div className={this.displaymodal}> 
                        <CreatePost />
                      </div>

                    </CSSTransition>

                

            </>
            
        );
    }
}

const mapStateToProps = state =>({
    cpd: state.cpdReducer
});

export default connect(mapStateToProps,{toggle})(Pen);

// References:

// http://reactcommunity.org/react-transition-group/css-transition
// https://codesandbox.io/s/wy4rnqly2k?from-embed=&file=/src/styles.css
// https://blog.logrocket.com/improve-your-ui-with-react-transition-group-999fa35f7cae/
// https://reactjs.org/docs/animation.html
