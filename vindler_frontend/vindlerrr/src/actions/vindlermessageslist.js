import axios from "axios";
import {returnErrors } from './messages';
import {ADD_VINDLE_MESSAGE_LIST,GET_VINDLE_MESSAGE_LIST } from "./types";



//Headers
const config = {
    headers: {
        'Content-Type': 'application/json'
    }

}

// ADD TO MESSAGE LIST 
export const addtoMessageList = (messageuserlist) => (dispatch) =>{

    axios.post("http://127.0.0.1:8000/messages/message-list/",messageuserlist, config)
        .then(res =>{
            dispatch({
                type: ADD_VINDLE_MESSAGE_LIST,
                payload: res.data
            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET MESSAGE LIST 
export const getMessageList = () => (dispatch) =>{

    axios.get('http://127.0.0.1:8000/messages/message-list/', config)
        .then(res =>{
            dispatch({
                type: GET_VINDLE_MESSAGE_LIST,
                payload: res.data
            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

