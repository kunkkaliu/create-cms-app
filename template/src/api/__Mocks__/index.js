import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = axios.create();
const mock = new MockAdapter(mockAxios);

mock.onPost('/submit').reply((config) => {
    const postData = JSON.parse(config.data);
    return new Promise((resolve) => {
        setTimeout(() => {
            if(postData.name) {
                resolve([200, {
                    code: 0,
                    data: {
                        name: postData.name,
                        age: '29',
                        nickname: '天下第一帅!',
                    },
                }]);
            }else {
                resolve([200, {
                    code: 0,
                    data: null,
                }]);
            }
        }, 500);
    });
});

export default mockAxios;
