import axios from "axios";
import { createMessage, returnErrors } from './messages';
import {PROFILE_PICTURE_SUCCESS, GET_PROFILE_PICTURE, HOME_PROFILE_PICTURE, DISPLAY_UPLOAD_DIV, CLOSE_UPLOAD_DIV } from "./types";



// ADD PROFILE PICTURE

const head = {headers: {
    'content-type': 'multipart/form-data'
  }
}

export const addprofilepicture = (picturedata) => (dispatch) =>{

    axios.post("https://vindlerbackend.herokuapp.com/vindlerprofilepicture/",picturedata, head)

    
        .then(res =>{
            //dispatch(createMessage({postAdded: 'Post has been uploaded!'}));
            dispatch({
                type: PROFILE_PICTURE_SUCCESS,
                payload: res.data
            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const getprofilepicture = (name) =>(dispatch)=>{

    axios.get(`https://vindlerbackend.herokuapp.com/getvindlerprofilepicture/${name}`)

        .then(res =>{
           // dispatch(createMessage({postAdded: 'Post has been uploaded!'}));
            dispatch({
                type: GET_PROFILE_PICTURE,
                payload: res.data
            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const homeprofilepicture = (name) =>(dispatch)=>{

    axios.get(`https://vindlerbackend.herokuapp.com/getvindlerprofilepicture/${name}`)

        .then(res =>{
           // dispatch(createMessage({postAdded: 'Post has been uploaded!'}));
            dispatch({
                type: HOME_PROFILE_PICTURE,
                payload: res.data
            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const displayuploaddiv  = () => dispatch =>{

    dispatch({
        type:DISPLAY_UPLOAD_DIV,
    
    });


};

export const closeuploaddiv  = () => dispatch =>{

    dispatch({
        type:CLOSE_UPLOAD_DIV,
    
    });


};

