import React,{Component}  from 'react';
import defaultp from './defaultp.jpg'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getprofilepicture} from '../../actions/profilepicture';

//  height= "80" width="80"
class  ProfilePicture extends Component  {

    static propTypes = {
       
        profilepicture: PropTypes.object.isRequired, 
        getprofilepicture:PropTypes.func.isRequired,
        
    }

    componentDidMount(){ 
        //const name = this.props.auth.user.username
        //console.log(this.props.user_name)
        this.props.getprofilepicture(this.props.user_name);

        //const pk = this.props.auth.user.id
        //this.props.getprofilepicture(pk);
    }



    render (){

        const  {image_available} = this.props.profilepicture
        //{image_available ? <img id ="pp" src={image} /> : <img id ="pp" src={defaultp} />}

        return (
            <>
                <div id = "profilepicture">

                {image_available ? <img id ="pp" src={this.props.profilepicture.image.image} /> : <img id ="pp" src={defaultp} />}
                
                
                </div>
            </> 
        );
    }
}

const mapStateToProps =  state => ({
    profilepicture: state.profilepictureReducer,
    auth: state.authReducer 
});

export default connect(mapStateToProps, {getprofilepicture})(ProfilePicture);