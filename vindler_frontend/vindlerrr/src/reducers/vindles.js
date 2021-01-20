import {GET_VINDLES, DELETE_VINDLE, ADD_VINDLE,GET_USER_VINDLES} from '../actions/types.js';

const initialState={
    vindles: []
}
 
export default function(state= initialState, action){

    switch(action.type){

        case GET_VINDLES:
        case GET_USER_VINDLES:
            return{
                ...state,
                vindles: action.payload
            };
        case DELETE_VINDLE:
            return{
                ...state,
                vindles: state.vindles.filter(vindle => vindle.id !==
                    action.payload)
            };
        case ADD_VINDLE:
            return{
                ...state,
                vindles: [action.payload, ...state.vindles]
            };
        default:
            return state;
         
    }

}