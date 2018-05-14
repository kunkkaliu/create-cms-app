/**
 * Created by liudonghui on 2018/3/16.
 */
import { actions } from 'actions/menu';
import { ReducerFactory } from 'utils/reducerUtil';
import { getPermissions, getMenus } from 'utils/menu';

const initialState = {
    menus: [],
    user: {},
    collapsed: false,
};
const menu = ReducerFactory(initialState, 'menu');

menu.action(actions.GETMENU_PENDING, function (state, action) {
    return Object.assign({}, state, {
        menus: [],
        user: {},
    });
});

menu.action(actions.GETMENU_SUCCESS, function (state, action) {
    const data = (action.payload.data && action.payload.data.data) || {};
    const codes = getPermissions(data.codes || []);
    const menus = getMenus(codes || []);
    return Object.assign({}, state, {
        menus: menus,
        user: data.user || {},
    });
});

menu.action(actions.UPDATE_COLLAPSED, function (state, action) {
    return Object.assign({}, state, {
        collapsed: action.payload.collapsed,
    });
});

export default menu;
