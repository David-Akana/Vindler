import React,{Component}  from 'react';
import defaultp from './defaultp.jpg'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {homeprofilepicture} from '../../actions/profilepicture';

//  height= "80" width="80"
class  HomeProfilePicture extends Component  {

    static propTypes = {
       
        profilepicture: PropTypes.object.isRequired, 
        homeprofilepicture:PropTypes.func.isRequired,
        
    }

    componentDidMount(){ 
        const name = this.props.auth.user.username
        //console.log(this.props.user_name)
        this.props.homeprofilepicture(name);

        //const pk = this.props.auth.user.id
        //this.props.getprofilepicture(pk);
    }


 
    render (){

        const  {home_image_available} = this.props.profilepicture
        //const image = this.props.authReducer.image
        //this.props.profilepicture.Himage.image
        //
        return (
            <>
                <div id = "profilepicture"> 

                {home_image_available ? <img id ="pp" src={this.props.profilepicture.Himage.image} /> : <img id ="pp" src={defaultp} />} 
                   
                </div>
            </> 
        );
    }
}

const mapStateToProps =  state => ({
    profilepicture: state.profilepictureReducer,
    auth: state.authReducer 
});

export default connect(mapStateToProps, {homeprofilepicture})(HomeProfilePicture);