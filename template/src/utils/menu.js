/**
 * Created by liudonghui on 2018/3/15.
 */
import pathToRegexp from 'path-to-regexp';

const after_marker = {
    'menu_base': ['menu.dashboard'],
};

export function getPermissions(userPermissions) {
    const permissions = [];
    userPermissions.forEach((item) => {
        const p = after_marker[`${item.mark}`] || [];
        p.forEach((menu) => {
            if (permissions.indexOf(`${menu}`) === -1) {
                permissions.push(menu);
            }
        });
    });
    return permissions;
}

export const appMenu = [
    {
        id: 1,
        path: '/dashboard',
        slug: 'menu.dashboard',
        name: 'Dashboard',
        icon: 'desktop',
    },
];

const menuMapTmp = new Map();
const browseMenu = (item) => {
    menuMapTmp.set(item.id, item);
    if (item.child) {
        item.child.forEach(browseMenu);
    }
};

appMenu.forEach(browseMenu);

export const menuMap = menuMapTmp;

/**
 * 根据权限获取菜单.
 * @param {codes} 权限数组.
 * @returns {menus} 树形结构的菜单.
 * @author liudonghui.
 */
export function getMenus(codes) {
    const myMenus = (menus, codes) => {
        const appMenuTmp = [];
        for (let i = 0; i < menus.length; i++) {
            if (codes.indexOf(menus[i].slug) >= 0) {
                menus[i].permission = true;
                const menuTmp = Object.assign({}, menus[i]);
                if (menus[i].child && menus[i].child.length >= 0) {
                    menuTmp.child = myMenus(menus[i].child, codes);
                }
                appMenuTmp.push(menuTmp);
            }
        }
        return appMenuTmp;
    };
    return myMenus(appMenu, codes);
}

/**
 * 根据路径获取当前菜单.
 * @param {path} 路由路径.
 * @returns {menus} 当前menu.
 * @author liudonghui.
 */
export function getCurrentMenu(path) {
    let currentMenu;
    const getCurrent = (menus, path) => {
        for (let i = 0; !currentMenu && i < menus.length; i++) {
            if (menus[i].path && pathToRegexp(menus[i].path).exec(path)) {
                currentMenu = menus[i];
            } else if (menus[i].child && menus[i].child.length >= 0) {
                getCurrent(menus[i].child, path);
            }
        }
    };
    getCurrent(appMenu, path);
    return currentMenu;
}

/**
 * 根据当前菜单获取路径.
 * @param {current} 当前菜单.
 * @returns {paths} 路径数组.
 * @author liudonghui.
 */
export function getPathArray(current) {
    const pathArray = [];
    const getPath = (item) => {
        pathArray.unshift(item);
        if (item.pid) {
            getPath(menuMap.get(item.pid));
        }
    };
    getPath(current);
    return pathArray;
}
