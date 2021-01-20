import axios from "axios";
import { createMessage, returnErrors } from './messages';
import {tokenConfig} from './auth';
import {GET_VINDLES,  DELETE_VINDLE, ADD_VINDLE,GET_USER_VINDLES} from "./types";

// GET VINDLES
export const getVindles = () => (dispatch, getState) =>{
 
    axios.get('https://vindlerbackend.herokuapp.com/vindler-requests/',tokenConfig(getState))
        .then(res =>{
            dispatch({
                type: GET_VINDLES,
                payload: res.data
            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE VINDLE

export const deleteVindle = (id) => (dispatch, getState) =>{

    axios.delete(`https://vindlerbackend.herokuapp.com/delete/${id}/`, tokenConfig(getState))
        .then(res =>{
            dispatch(createMessage({postDeleted: 'Post Deleted!'}));
            dispatch({
                type: DELETE_VINDLE,
                payload: id
            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));//.catch(err => console.log(err));
}

// ADD VINDLE
export const addVindle = (vindle) => (dispatch, getState) =>{

    axios.post("https://vindlerbackend.herokuapp.com/vindler-requests/",vindle,tokenConfig(getState))

        .then(res =>{
            dispatch(createMessage({postAdded: 'Post has been uploaded!'}));
            dispatch({
                type: ADD_VINDLE,
                payload: res.data
            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET USER VINDLES
export const getUserVindles = (username) => (dispatch, getState) =>{

    axios.get(`https://vindlerbackend.herokuapp.com/user-request/${username}`,tokenConfig(getState))
        .then(res =>{
            dispatch({
                type: GET_USER_VINDLES,
                payload: res.data
            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

