import axios from 'axios';
import { returnErrors } from './messages';

import { USER_LOADED, USER_LOADING, AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS, REGISTER_SUCCESS,REGISTER_FAIL} from './types';

// CHECK TOKEN AND LOAD USER

export const loadUser = () => (dispatch, getState) => {

    // User Loading
    dispatch({type: USER_LOADING});


    axios.get('https://vindlerbackend.herokuapp.com/user/',tokenConfig(getState))
    .then( res=>{
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });

    }).catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status));
            dispatch({type:AUTH_ERROR});
    });

}
// register User
export const register = (username,password) => dispatch => {


    //Headers
    const config ={

        headers: {
            'Content-Type': 'application/json'
        }

    }

    // request Body

    const body = JSON.stringify({ username, password });

    axios.post('https://vindlerbackend.herokuapp.com/register/', body, config)
    .then( res=>{
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });

    }).catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status));
            dispatch({type:REGISTER_FAIL});
    });

}

// LOGIN USER
export const login = (username,password) => dispatch => {


    //Headers
    const config ={

        headers: {
            'Content-Type': 'application/json'
        }

    }

    // request Body

    const body = JSON.stringify({ username, password });

    axios.post('https://vindlerbackend.herokuapp.com/login/', body, config)
    .then( res=>{
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });

    }).catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status));
            dispatch({type:LOGIN_FAIL});
    });

}

// LOGOUT USER

export const logout = () => (dispatch, getState) => {

    axios.post('https://vindlerbackend.herokuapp.com/logout/',null,tokenConfig(getState))
    .then( res=>{
        dispatch({
            type:LOGOUT_SUCCESS,
        });

    }).catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status));
    });

};

// setup config with token - helper function

export const tokenConfig = getState => {

    
    // Get token from state
    const token = getState().authReducer.token;

    //Headers
    const config ={

        headers: {
            'Content-Type': 'application/json'
        }

    }

    // If token, add to headers config
    if(token) {

        config.headers['Authorization'] = `Token ${token}`;

    }


    return config;



}