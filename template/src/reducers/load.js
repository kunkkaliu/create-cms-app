/**
 * Created by liudonghui on 17/6/19.
 */
import {
    ADDHTTPLOAD,
    DELHTTPLOAD,
} from '../actions/load';

const initialState = {
    httpLength: 0,
};

export default function load(state = initialState, action = {}) {
    switch (action.type) {
        case ADDHTTPLOAD:
            return Object.assign({}, state, { httpLength: state.httpLength + 1 });
        case DELHTTPLOAD:
            return Object.assign({}, state, { httpLength: state.httpLength - 1 });
        default:
            return state;
    }
}
