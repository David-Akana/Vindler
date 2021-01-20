import {PROFILE_PICTURE_SUCCESS, GET_PROFILE_PICTURE, HOME_PROFILE_PICTURE, DISPLAY_UPLOAD_DIV, CLOSE_UPLOAD_DIV } from '../actions/types.js';


const initialState={
    image: null,
    image_available: false,
    Himage:null,
    home_image_available: false,
    show_image_div: false
}

export default function(state= initialState, action){

    switch(action.type){
 
        case PROFILE_PICTURE_SUCCESS:
            return{
                ...state,
                image: action.payload
            };

        case GET_PROFILE_PICTURE:
            return{
                ...state,
                image: action.payload,
                image_available: true

            };
        case HOME_PROFILE_PICTURE:
            return{
                ...state,
                Himage: action.payload,
                home_image_available: true
            };

        case  DISPLAY_UPLOAD_DIV:
            return{
                show_image_div: true
            };
        case CLOSE_UPLOAD_DIV:
            return{
                show_image_div: false
            };
    
    
            
        default:
            return state;
         
    }

}