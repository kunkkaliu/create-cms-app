/**
 * Created by liudonghui on 2018/3/15.
 */
export const appMenu = [
    {
        id: 1,
        router: '/dashboard',
        name: 'Dashboard',
        icon: 'smile-o',
    }, {
        id: 2,
        pid: 1,
        name: '权限管理',
        icon: 'user',
        child: [
            {
                id: 21,
                pid: 2,
                router: '/auth/permission',
                name: '权限配置',
                authority: ['admin'],
            },
        ],
    },
];
