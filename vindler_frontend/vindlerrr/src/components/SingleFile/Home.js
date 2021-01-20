import React,{Component}  from 'react';
import Post from '../PostFile/Post';
import Pen from '../PostFile/Pen';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {pagescroll, nopagescroll} from '../../actions/scroller';
import LTProfile from '../LinkTo/LTProfile';
import LTMessages from '../LinkTo/LTMessages';
import SearchEngine from '../HeaderFile/SearchEngine';
import {closeDiv} from '../../actions/search';
import {Link} from 'react-router-dom';




class Home extends Component{

    state = {
       
    };
    
    static propTypes = {
        scroller: PropTypes.object.isRequired,
        pagescroll:PropTypes.func.isRequired,
        nopagescroll:PropTypes.func.isRequired,
        closeDiv:PropTypes.func.isRequired
    }
   
    componentDidMount() {
       window.addEventListener('scroll', this.onScroll); // {passive: true}
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
        
    }

    onClick = () =>{
        this.props.closeDiv();
    }


    onScroll = event => {

        //console.log(event)
        //console.log(event.bubbles)
        //console.log(event.path[1].window.scrollY)

        const hold = event.path[1].window.scrollY ;
        //console.log(hold)

        
        if(hold > 100){

            this.props.pagescroll();

        }else if(hold < 100){

            this.props.nopagescroll();


        }

       
    }

    render(){

        const {scrolling} = this.props.scroller;

        this.displaydiv= scrolling ? "display-visibility" : "display-none-visibility";

        const {toggle_div, user_info} = this.props.search;
        this.displaySearch= toggle_div ? "display-search" : "display-none-search";

        return (
            <> 
                
                <div className="postContent"> 
                    <Post/> 
                    <Pen/>

                    <div className={this.displaydiv} >
                        <LTMessages/>
                        <LTProfile/>
                    </div>

                    <div className="smallScreenSearch">
                        <div className={this.displaySearch}>
                           {user_info.map(info =>( <Link style={{ textDecoration: 'none', color:"white" }} to={`/Profile/${info.username}`}><p onClick={this.onClick}style={{textAlign:"center",fontFamily:"'PT Serif', serif;"}}> {info.username}</p></Link> ))}   
                        </div>
                        <SearchEngine/>
                        
                    </div>  

                </div> 
                

                
            </>
        );

    }
};
const mapStateToProps = state =>({
    scroller: state.scrollerReducer,
    search: state.searchReducer
});  
 
export default connect(mapStateToProps,{pagescroll,nopagescroll, closeDiv})(Home);