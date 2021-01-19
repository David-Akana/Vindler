import React,{Component}  from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addprofilepicture} from '../../actions/profilepicture';
import { closeuploaddiv } from "../../actions/profilepicture";

class  UploadProfilePicture extends Component  {

    static propTypes = {
       
        profilepicture: PropTypes.object.isRequired, 
        addprofilepicture:PropTypes.func.isRequired,
        closeuploaddiv: PropTypes.func.isRequired
        
    }

    state ={
        image: null,
        user:{}
    }

    onChange = (e) => {
        this.setState({
        
          image: e.target.files[0]
         
        })
      };


    componentDidMount() {
        this.setState({ 
            user: this.props.auth.user
        })
         
     }
    

      onSubmit = (e) => {
        e.preventDefault();

        /*let data = {"username": this.state.user.username }
        let form_data = new FormData();
        form_data.append("image", this.state.image);
        form_data.append("user", JSON.stringify(data));*/

        let form_data =new FormData();
        form_data.append("image", this.state.image)
        form_data.append("user", this.state.user.id)
        this.props.addprofilepicture(form_data)

        this.props.closeuploaddiv()

        window.location.reload();
        
      };

 

    render (){

        return (
            <>
             <form onSubmit={this.onSubmit} >
              <input type="file" 
                    id="imageupload" 
                    accept="image/png, image/jpeg, image/jpg" 
                    onChange={this.onChange}
                    
                />
              <input id="imagesend" type="submit"/>
              </form>
            </> 
        );
    }
}

const mapStateToProps =  state => ({
    profilepicture: state.profilepictureReducer,
    auth: state.authReducer 
});

export default connect(mapStateToProps, {addprofilepicture, closeuploaddiv})(UploadProfilePicture);