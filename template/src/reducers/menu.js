/**
 * Created by liudonghui on 2018/3/16.
 */
import {
    GETMENU_PENDING,
    GETMENU_SUCCESS,
    UPDATE_OPENKEYS,
    UPDATE_COLLAPSED,
} from '../actions/menu';

import { getMenus } from '../utils';

const initialState = {
    menus: [],
    openKeys: [],
    user: {},
    collapsed: false,
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

        case UPDATE_COLLAPSED:
            return Object.assign({}, state, {
                collapsed: action.payload.collapsed,
            });

        default:
            return state;
    }
}
