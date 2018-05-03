/**
 * Created by liudonghui on 2018/3/15.
 */
import React from 'react';
import { isPromise } from 'utils';
import PromiseRender from './PromiseRender';


/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type bool | string | array | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
    // bool 处理
    if (typeof authority === 'boolean') {
        if (authority) {
            return target;
        }
        return Exception;
    }

    // 没有判定权限.默认查看所有
    // Retirement authority, return target;
    if (!authority) {
        return target;
    }

    // 数组处理
    if (Array.isArray(authority)) {
        if (authority.indexOf(currentAuthority) >= 0) {
            return target;
        }
        return Exception;
    }

    // string 处理
    if (typeof authority === 'string') {
        if (authority === currentAuthority) {
            return target;
        }
        return Exception;
    }

    // Promise 处理
    if (isPromise(authority)) {
        return <PromiseRender ok={target} error={Exception} promise={authority} />;
    }

    // Function 处理
    if (typeof authority === 'function') {
        try {
            const bool = authority();
            if (bool) {
                return target;
            }
            return Exception;
        } catch (error) {
            throw error;
        }
    }
    throw new Error('unsupported parameters');
};

export default checkPermissions;
