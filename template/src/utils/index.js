import pathToRegexp from 'path-to-regexp';
import { appMenu } from './menu';

export function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
}

export function getCookie(name) {
    const value = `;  ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    const partsLength = 2;
    if (parts.length === partsLength) return parts.pop().split(';').shift();
    return null;
}

export function setCookie(name, date) {

}


const menuMapTmp = new Map();
const browseMenu = (item) => {
    menuMapTmp.set(item.id, item);
    if (item.child) {
        item.child.forEach(browseMenu);
    }
};

appMenu.forEach(browseMenu);

export const menuMap = menuMapTmp;

export function getMenus(role) {
    const myMenus = (menus, role) => {
        let appMenuTmp = [];
        for (let i = 0; i < menus.length; i++) {
            if (!menus[i].authority || menus[i].authority.indexOf(role) >= 0) {
                let menuTmp = Object.assign({}, menus[i]);
                if (menus[i].child && menus[i].child.length >= 0) {
                    menuTmp.child = myMenus(menus[i].child, role);
                }
                appMenuTmp.push(menuTmp);
            }
        }
        return appMenuTmp;
    };
    return myMenus(appMenu, role);
}

export function getCurrentMenu(path) {
    let currentMenu;
    const getCurrent = (menus, path) => {
        for (let i = 0; !currentMenu && i < menus.length; i++) {
            if (menus[i].router && pathToRegexp(menus[i].router).exec(path)) {
                currentMenu = menus[i];
            } else if (menus[i].child && menus[i].child.length >= 0) {
                getCurrent(menus[i].child, path);
            }
        }
    };
    getCurrent(appMenu, path);
    return currentMenu;
}

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
