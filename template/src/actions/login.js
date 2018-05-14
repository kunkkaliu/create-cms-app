/**
 * Created by liudonghui on 2018/3/28.
 */
import { netApi as api } from 'network';

export const actions = {
    LOGIN: 'login/reducer/LOGIN',
    LOGIN_PENDING: 'login/reducer/LOGIN_PENDING',
    LOGIN_SUCCESS: 'login/reducer/LOGIN_SUCCESS',
    LOGIN_ERROR: 'login/reducer/LOGIN_ERROR',
};

export function login(data) {
    return {
        type: actions.LOGIN,
        payload: {
            promise: api.post('/login/login', {
                ...data,
            }),
        },
    };
}
