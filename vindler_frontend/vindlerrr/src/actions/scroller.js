import {SCROLL_SUCCESS,NO_SCROLL} from './types';


export const pagescroll = () => dispatch =>{

    dispatch({
        type: SCROLL_SUCCESS
    });


};

export const nopagescroll = () => dispatch =>{

    dispatch({
        type: NO_SCROLL
    });


};