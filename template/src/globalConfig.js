/**
 * Created by liudonghui on 2018/5/2.
 */
let apiHost = '//xx.xx.com';
let ravenHost = 'http://xx.xx.com';

if (CODE_ENV === 'qa') {
    apiHost = '//xx.xx.com';
    ravenHost = 'http://xx.xx.com';
} else if (CODE_ENV === 'online') {
    apiHost = '//xx.xx.com';
    ravenHost = 'http://xx.xx.com';
}

export default {
    apiHost,
    ravenHost,
};
