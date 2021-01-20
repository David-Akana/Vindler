import {SEARCH_USER, CLOSE_SEARCH_DIV,  MESSAGE_SEARCH_USER} from '../actions/types.js';

const initialState={
    user_info: [],
    for_messages_user_list: [],
    toggle_messages: false,
    toggle_div: false
}
 
export default function(state= initialState, action){

    switch(action.type){

        case SEARCH_USER:
            return{
                ...state,
                toggle_div: true,
                user_info: action.payload
            };

        case MESSAGE_SEARCH_USER:
            return{
                ...state,
                toggle_messages: true,
                for_messages_user_list: action.payload
            };


        case CLOSE_SEARCH_DIV:
            return{
                ...state,
                toggle_messages: false,
                toggle_div: false
            };
    
        default:
            return state;
         
    }

}