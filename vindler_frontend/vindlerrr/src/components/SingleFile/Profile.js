import React,{Component, Fragment}  from 'react';
import ProfilePage from "./ProfilePage";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import LTHome from '../LinkTo/LTHome';
import LTMessages from '../LinkTo/LTMessages';
import {pagescroll, nopagescroll} from '../../actions/scroller';

export class Profile extends Component {

    static propTypes = {
        scroller: PropTypes.object.isRequired,
        pagescroll:PropTypes.func.isRequired,
        nopagescroll:PropTypes.func.isRequired
        
    };
    /*<span><ProfilePicture/></span>*/
    
    componentDidMount(){
        window.addEventListener('scroll', this.onScroll);
    } 

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
        
    }

    onScroll = event => {

        //console.log(event)
        //console.log(event.path[1].window.scrollY)

        const hold = event.path[1].window.scrollY ;

        if(hold > 50){

            this.props.pagescroll();

        }else if(hold < 100){

            this.props.nopagescroll();


        }   
    }

    render(){

        const {scrolling} = this.props.scroller;

    
        this.displaydiv= scrolling ? "display-visibility" : "display-none-visibility";

        return (

            <>

                <div className="postContent">
              
                    <ProfilePage username = {this.props.match.params.userId} />
                    
                    <div className={this.displaydiv} >
                       <LTMessages/>
                       <LTHome/>
                    </div> 

                </div>

            </>
        );
    } 
}




const mapStateToProps = state =>({
    scroller: state.scrollerReducer
});

export default connect(mapStateToProps,{pagescroll,nopagescroll})(Profile);