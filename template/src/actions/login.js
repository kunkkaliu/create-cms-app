/**
 * Created by liudonghui on 2018/3/28.
 */
import { netApi as api } from 'network';

export const LOGIN = 'login/reducer/LOGIN';
export const LOGIN_PENDING = 'login/reducer/LOGIN_PENDING';
export const LOGIN_SUCCESS = 'login/reducer/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'login/reducer/LOGIN_ERROR';

export function login(data) {
    return {
        type: LOGIN,
        payload: {
            promise: api.post('/login/login', {
                ...data,
            }),
        },
    };
}
