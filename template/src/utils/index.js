export function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
}

export function getCookie(name) {
    const value = `;  ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    const partsLength = 2;
    if (parts.length === partsLength) return parts.pop().split(';').shift();
    return null;
}

export function setCookie(name, date) {

}
