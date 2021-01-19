import {SCROLL_SUCCESS,NO_SCROLL} from '../actions/types';


const initialState={
    scrolling: false
}



export default function(state=initialState, action){

    switch(action.type){
        
        case SCROLL_SUCCESS:
            return{
                ...state,
                //scrolling: !state.scrolling,
                scrolling: true,
            };

        case NO_SCROLL:
            return{
                ...state,
                scrolling: false,
            };
            


        default:
            return state;
    }
}