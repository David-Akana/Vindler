import { DISPLAY_CHAT_SUCCESS} from './types';


export const displaychat = (name) => dispatch =>{

    dispatch({
        type:DISPLAY_CHAT_SUCCESS,
        payload: name
        
    });


};