/**
 * Created by liudonghui on 2017/11/4.
 */

import axios from 'axios';

/**
 * 生成netApi对象
 * @param config api配置
 * @param useInterceptors 全局拦截器
 * @return {AxiosInstance}
 */
export function generateNet(config, useInterceptors) {
    if (MOCK) {
        const getMockInstance = require('./mock-generate').default;
        const mock = getMockInstance();
        config.adapter = request => new Promise(resolve =>
            mock(request, (data) => {
                setTimeout(() => {
                    if (typeof data.data === 'function') {
                        const { config } = data;
                        const params = JSON.parse(config.data);
                        resolve({
                            ...data,
                            data: data.data(params),
                        });
                    } else {
                        resolve(data);
                    }

                }, 500);
            }));
        config.baseURL = '';
    }
    const netApi = axios.create(config);
    useInterceptors(netApi);
    return netApi;
}
