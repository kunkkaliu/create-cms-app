/**
 * Created by liudonghui on 2018/3/28.
 */
import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from 'actions/login';

const initialState = {
    submitting: false,
    loginStatus: '',
};


export default function login(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN_PENDING:
            return Object.assign({}, state, {
                submitting: true,
                loginStatue: '',
            });
        case LOGIN_SUCCESS:
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
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                submitting: false,
                loginStatus: 'error',
            });

        default:
            return state;
    }
}
