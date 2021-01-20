import axios from "axios";
import {returnErrors } from './messages';
import {tokenConfig} from './auth';
import {SEARCH_USER,CLOSE_SEARCH_DIV, MESSAGE_SEARCH_USER} from "./types";

// SEARCH USER 
  
export const searchUser = (username) => (dispatch, getState) =>{

    axios.get(`https://vindlerbackend.herokuapp.com/search-user/${username}`,tokenConfig(getState)) 
    .then(res =>{
        dispatch({
            type: SEARCH_USER,
            payload: res.data
        });

    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}

// MESSAGE SEARCH USER 
export const searchMessageUserList = (username) => (dispatch, getState) =>{

    axios.get(`https://vindlerbackend.herokuapp.com/search-user/${username}`,tokenConfig(getState)) 
    .then(res =>{
        dispatch({
            type:  MESSAGE_SEARCH_USER,
            payload: res.data
        });

    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}

export const closeDiv = () => dispatch =>{

    dispatch({
        type:CLOSE_SEARCH_DIV,
    });


};