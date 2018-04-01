/**
 * Created by liudonghui on 2018/3/31.
 */
import AsyncComponent from 'components/AsyncComponent';

export default {
    BasicLayout: [
        {
            key: '/dashboard',
            path: '/dashboard',
            exact: true,
            component: AsyncComponent(() => import(/* webpackChunkName: "dashboard" */ 'pages/Dashboard'), true),
        },
    ],
};
