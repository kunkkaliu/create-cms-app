export function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
}

// 获取cookie中的值
export function getCookie(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = window.document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    }
    return null;
}

// 设置cookie中的值 expiresDays是天数
export function setCookie(name, value, expiresDays) {
    let date = new Date();
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
    window.document.cookie = name + '=' + value + ';expires=' + date.toGMTString() + ';path=/';
}

// 删除cookie中的值
export function removeCookie(name) {
    setCookie(name, 'test', -1);
}
