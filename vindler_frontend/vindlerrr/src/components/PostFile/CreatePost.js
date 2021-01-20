import React,{Component}  from 'react';
import {connect} from 'react-redux';
import HomeProfilePicture from './HomeProfilePicture';
import PropTypes from 'prop-types';
import {toggle} from '../../actions/cpd';
import {addVindle} from '../../actions/vindles';



export class CreatePost extends Component {

    
// ${this.getState().authReducer.user.username}

    

    state = {
        name:"",
        post:"",
        owner:"",
        
        
    }
   
    static propTypes = {
        auth: PropTypes.object.isRequired,
        addVindle:PropTypes.func.isRequired
    }

    componentDidMount() {
        this.setState({ 
            name: this.props.auth.user.username,
            owner: this.props.auth.user.id
    
        })
         
     }

    
  
    

    onChange = e => this.setState({[e.target.name]:e.target.value});

    onSubmit = e  => {
        e.preventDefault();
        const {name, post, owner} = this.state;
        const vindle = {name, post, owner};
        this.props.addVindle(vindle);

        this.setState({
            post:""
        });

        this.props.toggle();
    };

    onClick = () =>{
        this.props.toggle();

    }

    render(){

        const {post} =  this.state;
       
        


        return (

            <div id ="createPost">

                <button className="cancelPostBtn" onClick={this.onClick}>X</button>

                <div style={divImageStyle}><HomeProfilePicture/></div>
                <form onSubmit={this.onSubmit} >

                    <textarea 
                        type="text" 
                        name="post" 
                        onChange={this.onChange} 
                        value= {post}
                        placeholder=" Wassup ..." 
                    />

                    <button id="postbtn" type='submit'>Post</button>
                </form> 
               
                
            </div>
                
        );

    }
}

const divImageStyle ={
    marginTop:'30px',
    marginLeft:'30px'
}

const mapStateToProps = state =>({
    auth: state.authReducer
});


export default connect(mapStateToProps, {addVindle, toggle})(CreatePost);