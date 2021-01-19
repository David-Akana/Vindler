import React, {Component,Fragment} from 'react';
import { withAlert } from "react-alert";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class Alerts extends Component{

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps){
        const { error, alert, message } =  this.props;

        if(error !== prevProps.error){
            if (error.msg.post) alert.error(`post: ${error.msg.post.join()}`); // join() converts the array to a string.
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join()); 
            if (error.msg.detail) alert.error(error.msg.detail);
        }

        if(message !== prevProps.message){
            if (message.postDeleted) alert.success(message.postDeleted); 
            if (message.postAdded) alert.success(message.postAdded);
            if (message.passwordMisMatch) alert.error(message.passwordMisMatch);
  
        }
        
    }

    render(){
        return <Fragment/>;

    }
}

const mapStateToProps = state => ({
    error: state.errorReducer,
    message: state.messageReducer
});

export default connect(mapStateToProps)(withAlert()(Alerts));
