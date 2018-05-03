/**
 * Created by liudonghui on 2018/3/31.
 */
// import AsyncComponent from 'components/AsyncComponent';
//
// export default {
//     BasicLayout: [
//         {
//             key: '/dashboard',
//             path: '/dashboard',
//             exact: true,
//             component: AsyncComponent(() => import(/* webpackChunkName: "dashboard" */ 'pages/Dashboard'), true),
//         },
//     ],
// };




/**
 * Created by liudonghui on 2018/3/31.
 */
import pathToRegexp from 'path-to-regexp';
import ConnectRoute from 'components/ConnectRoute';
import Dashboard from 'pages/Dashboard';

const DashboardWrapper = ConnectRoute(Dashboard);

/**
 * 获取扁平化的菜单结构.
 * @param {menus} 树形结构的菜单,
 * example: {
 *              'path': '/A',
 *              'child': [{
 *                  'path': '/A/C',
 *              }],
 *          }
 *
 * @returns {keys} 扁平结构的菜单,
 * example: {
 *              '/A': xxx,
 *              '/A/C': xxx,
 *          }
 * @author liudonghui.
 */
function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach((item) => {
        if (item.child) {
            keys[item.path] = { ...item };
            keys = { ...keys, ...getFlatMenuData(item.child) };
        } else {
            keys[item.path] = { ...item };
        }
    });
    return keys;
}

export const basicLayoutRouterConfig = {
    '/dashboard': {
        exact: true,
        component: DashboardWrapper,
    },
};

/**
 * 根据路由配置信息获取路由完整数据.
 * @param {routerConfig, menus} 路由配置信息，树形结构的菜单.
 * @returns {routerData} 某一路由下的所有完整的路由数据(包含权限).
 * @author liudonghui.
 */
export function getRouterData(routerConfig, menus) {
    const menuData = getFlatMenuData(menus);
    const routerData = [];
    Object.keys(routerConfig).forEach((path) => {
        const pathRegexp = pathToRegexp(path);
        const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
        let menuItem = {};
        if (menuKey) {
            menuItem = menuData[menuKey];
        }
        let router = routerConfig[path];
        router = {
            ...router,
            path: path,
            key: path,
            permission: menuItem.permission || false,
            name: router.name || menuItem.name,
        };
        routerData.push(router);
    });
    return routerData;
}


