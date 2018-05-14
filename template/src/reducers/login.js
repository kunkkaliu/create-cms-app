/**
 * Created by liudonghui on 2018/3/28.
 */
import { actions } from 'actions/login';
import { ReducerFactory } from 'utils/reducerUtil';

const initialState = {
    submitting: false,
    loginStatus: '',
};

const login = ReducerFactory(initialState, 'login');

login.action(actions.LOGIN_PENDING, function (state, action) {
    return Object.assign({}, state, {
        submitting: true,
        loginStatue: '',
    });
});

login.action(actions.LOGIN_SUCCESS, function (state, action) {
    if (action.payload.data && action.payload.data.code == 0) {
        return Object.assign({}, state, {
            submitting: false,
            loginStatus: 'success',
        });
    }
    return Object.assign({}, state, {
        submitting: false,
        loginStatus: 'error',
    });
});

login.action(actions.LOGIN_ERROR, function (state, action) {
    return Object.assign({}, state, {
        submitting: false,
        loginStatus: 'error',
    });
});

export default login;
