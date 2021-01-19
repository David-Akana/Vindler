import {ADD_VINDLE_MESSAGE_LIST, GET_VINDLE_MESSAGE_LIST} from '../actions/types.js';

const initialState={
    usermessagelist: []
}
 
export default function(state= initialState, action){

    switch(action.type){
        case ADD_VINDLE_MESSAGE_LIST:
            return{
                ...state,
                usermessagelist: [...state.usermessagelist, action.payload]
            };
        case GET_VINDLE_MESSAGE_LIST:
            return{
                ...state,
                usermessagelist: action.payload
            };
        default:
            return state;
         
    }

}