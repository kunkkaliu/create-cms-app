/**
 * Created by liudonghui on 2018/3/16.
 */
import {
    GETMENU_PENDING,
    GETMENU_SUCCESS,
    UPDATE_OPENKEYS,
} from '../actions/menu';

import { getMenus } from '../utils';

const initialState = {
    menus: [],
    openKeys: [],
    user: {},
};

export default function menu(state = initialState, action = {}) {
    let data, menus;
    switch (action.type) {
        case GETMENU_PENDING:
            return Object.assign({}, state, {
                menus: [],
                user: {},
            });
        case GETMENU_SUCCESS:
            data = (action.payload.data && action.payload.data.data) || {};
            menus = getMenus(data.role || '');
            return Object.assign({}, state, {
                menus: menus,
                user: data.user,
            });

        case UPDATE_OPENKEYS:
            return Object.assign({}, state, {
                openKeys: action.payload.openKeys,
            });

        default:
            return state;
    }
}
