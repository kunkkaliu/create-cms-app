/**
 * Created by liudonghui on 17/9/8.
 */
import { netApi as api } from 'network';

export const actions = {
    CHANGENAME: 'dashboard/reducer/CHANGENAME',
    SUBMIT: 'dashboard/reducer/SUBMIT',
    SUBMIT_SUCCESS: 'dashboard/reducer/SUBMIT_SUCCESS',
};

export function changeName(name) {
    return {
        type: actions.CHANGENAME,
        payload: {
            name,
        },
    };
}

export function submit(name) {
    return {
        type: actions.SUBMIT,
        payload: {
            promise: api.post('/test/greeter/sayhello', {
                name,
            }),
        },
    };
}
