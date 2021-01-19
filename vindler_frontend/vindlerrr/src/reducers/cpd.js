import {CPD_TOGGLE_SUCCESS} from '../actions/types';


const initialState={
    showCPD: false,
    showmodal: false
}


export default function(state=initialState, action){

    switch(action.type){

       
        case CPD_TOGGLE_SUCCESS:
            return{
                ...state,
                showCPD: !state.showCPD,
                showmodal: !state.showmodal,
                
            };

    

        default:
            return state;
    }
}