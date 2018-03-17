/**
 * Created by liudonghui on 17/6/19.
 */

export const ADDHTTPLOAD = 'load/reducer/ADDHTTPLOAD';
export const DELHTTPLOAD = 'load/reducer/DELHTTPLOAD';

export function addHttpLoadLength() {
    return {
        type: ADDHTTPLOAD,
    };
}

export function delHttpLoadLength() {
    return {
        type: DELHTTPLOAD,
    };
}
