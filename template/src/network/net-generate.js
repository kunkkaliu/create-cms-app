/**
 * Created by liudonghui on 2017/11/4.
 */

import axios from 'axios';
import getMockInstance from './mock-generate';

/**
 * 生成netApi对象
 * @param config api配置
 * @param useInterceptors 全局拦截器
 * @return {AxiosInstance}
 */
export function generateNet(config, useInterceptors) {
    if (MOCK) {
        const mock = getMockInstance();
        config.adapter = request => new Promise(resolve =>
            mock(request, (data) => {
                setTimeout(() => {
                    resolve(data);
                }, 200);
            }));
    }
    const netApi = axios.create(config);
    useInterceptors(netApi);
    return netApi;
}
