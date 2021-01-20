import {combineReducers} from 'redux';
import vindles from './vindles';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import cpd from './cpd';
import scroller from './scroller';
import search from './search';
import vindlermessageslist from './vindlermessageslist';
import messagedisplaylogic from './messagedisplaylogic';
import profilepicture from './profilepicture';

 


export default  combineReducers({
    vindleReducer: vindles,
    errorReducer: errors,
    messageReducer: messages,
    authReducer:auth,
    cpdReducer: cpd,
    scrollerReducer: scroller,
    searchReducer: search,
    vindlermessageslistReducer: vindlermessageslist,
    messagedisplaylogicReducer:  messagedisplaylogic,
    profilepictureReducer: profilepicture,

});