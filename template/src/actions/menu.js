/**
 * Created by liudonghui on 2018/3/16.
 */
import { netApi as api } from 'network';

export const GETMENU = 'menu/reducer/GETMENU';
export const GETMENU_PENDING = 'menu/reducer/GETMENU_PENDING';
export const GETMENU_SUCCESS = 'menu/reducer/GETMENU_SUCCESS';

export const UPDATE_OPENKEYS = 'menu/reducer/UPDATE_OPENKEYS';

export const UPDATE_COLLAPSED = 'menu/reducer/UPDATE_COLLAPSED';

export function updateOpenKeys(openKeys) {
    return {
        type: UPDATE_OPENKEYS,
        payload: {
            openKeys: openKeys,
        },
    };
}

export function getMenu() {
    return {
        type: GETMENU,
        payload: {
            promise: api.post('/auth/menu'),
        },
    };
}

export function updateCollapsed(collapsed) {
    return {
        type: UPDATE_COLLAPSED,
        payload: {
            collapsed,
        },
    };
}

