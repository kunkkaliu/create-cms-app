import { combineReducers } from 'redux';
import load from './load';
import dashboard from './dashboard';
import menu from './menu';

const rootReducer = combineReducers({
    load,
    dashboard,
    menu,
});

export default rootReducer;
