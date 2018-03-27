/**
 * Created by liudonghui on 17/9/8.
 */
import {
    CHANGENAME,
    SUBMIT_SUCCESS,
} from 'actions/dashboard';

const initialState = {
    name: '',
    userInfo: {},
};


export default function dashboard(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGENAME:
            return Object.assign({}, state, { name: action.payload.name });
        case SUBMIT_SUCCESS:
            return Object.assign({}, state, {
                userInfo: action.payload.data && action.payload.data.data,
            });
        default:
            return state;
    }
}
