/**
 * Created by liudonghui on 2018/3/16.
 */
import { netApi as api } from 'network';

export const actions = {
    GETMENU: 'menu/reducer/GETMENU',
    GETMENU_PENDING: 'menu/reducer/GETMENU_PENDING',
    GETMENU_SUCCESS: 'menu/reducer/GETMENU_SUCCESS',
    UPDATE_COLLAPSED: 'menu/reducer/UPDATE_COLLAPSED',
};

export function getMenu() {
    return {
        type: actions.GETMENU,
        payload: {
            promise: api.get('/auth/menu'),
        },
    };
}

export function updateCollapsed(collapsed) {
    return {
        type: actions.UPDATE_COLLAPSED,
        payload: {
            collapsed,
        },
    };
}

