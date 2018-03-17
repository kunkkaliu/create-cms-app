/**
 * Created by liudonghui on 2017/11/4.
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const netApi = axios.create();
const mock = new MockAdapter(netApi);

mock.onPost('/test/greeter/sayhello').reply((config) => {
    const postData = JSON.parse(config.data);
    return new Promise((resolve) => {
        resolve([200, require('../mock/test/Greeter/SayHello.js')]);
    });
});

/**
 * sayHello
 * @return {*|Promise}
 * @constructor
 */
export function sayHello(name) {
    return new Promise(resolve => {
        resolve({
            data: {
                code: 0,
                data: {
                    name: name,
                    age: 29,
                    nickname: '天下第一帅',
                },
            },
        });
    });
}

