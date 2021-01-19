import { DISPLAY_CHAT_SUCCESS} from '../actions/types';


const initialState={
    name: "",
    displaychat: false
}


export default function(state=initialState, action){

    switch(action.type){

        case  DISPLAY_CHAT_SUCCESS:
            return{
                ...state,
                name: action.payload,
                displaychat: true 
                
            };

        default:
            return state;
    }
}