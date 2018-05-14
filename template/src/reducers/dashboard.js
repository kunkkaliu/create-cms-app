/**
 * Created by liudonghui on 17/9/8.
 */

import { actions } from 'actions/dashboard';
import { ReducerFactory } from 'utils/reducerUtil';

const initialState = {
    name: '',
    userInfo: {},
};

const dashboard = ReducerFactory(initialState, 'dashboard');

dashboard.action(actions.CHANGENAME, function (state, action) {
    return Object.assign({}, state, {
        name: action.payload.name,
    });
});

dashboard.action(actions.SUBMIT_SUCCESS, function (state, action) {
    return Object.assign({}, state, {
        userInfo: action.payload.data && action.payload.data.data,
    });
});

export default dashboard;
