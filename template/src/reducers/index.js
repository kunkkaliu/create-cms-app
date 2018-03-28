import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import load from './load';
import dashboard from './dashboard';
import menu from './menu';
import login from './login';

const rootReducer = combineReducers({
    router: routerReducer,
    load,
    dashboard,
    menu,
    login,
});

export default rootReducer;
