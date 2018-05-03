/**
 * Created by liudonghui on 2018/3/15.
 */
import SVG404 from 'assets/img/404.svg';
import SVG403 from 'assets/img/403.svg';
import SVG500 from 'assets/img/500.svg';

const config = {
    403: {
        img: SVG403,
        title: '403',
        desc: '抱歉，你无权访问该页面',
    },
    404: {
        img: SVG404,
        title: '404',
        desc: '抱歉，你访问的页面不存在',
    },
    500: {
        img: SVG500,
        title: '500',
        desc: '抱歉，服务器出错了',
    },
};

export default config;
