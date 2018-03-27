/**
 * Created by liudonghui on 17/9/8.
 */
import { netApi as api } from 'network';

export const CHANGENAME = 'dashboard/reducer/CHANGENAME';
export const SUBMIT = 'dashboard/reducer/SUBMIT';
export const SUBMIT_SUCCESS = 'dashboard/reducer/SUBMIT_SUCCESS';

export function changeName(name) {
    return {
        type: CHANGENAME,
        payload: {
            name,
        },
    };
}

export function submit(name) {
    return {
        type: SUBMIT,
        payload: {
            promise: api.post('/test/greeter/sayhello', {
                name,
            }),
        },
    };
}
