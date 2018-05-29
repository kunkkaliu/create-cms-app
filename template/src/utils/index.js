import React from 'react';
import { Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

/**
 * 判断是否是promise对象
 * @param obj
 * @returns {boolean}
 */
export function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
}

/**
 * 获取指定name的cookie
 * @param name
 * @returns {null}
 */
export function getCookie(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = window.document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    }
    return null;
}

/**
 * 设置指定name的cookie
 * @param name
 * @param value
 * @param expiresDays:天数
 */
export function setCookie(name, value, expiresDays) {
    let date = new Date();
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
    window.document.cookie = name + '=' + value + ';expires=' + date.toGMTString() + ';path=/';
}

/**
 * 删除指定name的cookie
 * @param name
 */
export function removeCookie(name) {
    setCookie(name, '', -1);
}

/**
 * 获取Select中选择项
 * @param defOption
 * @param otherOptions
 * @param attributesRules
 * @returns {Array|*|{inline, annotation}}
 */
export function getSelectOptions(defOption = [], otherOptions = [], attributesRules = []) {
    const options = defOption.concat(otherOptions);
    return options.map((option) => {
        const attributes = {};
        if (attributesRules && attributesRules.length > 0) {
            attributesRules.forEach((attribute) => {
                const result = attribute.split('|');
                if (result.length > 1) {
                    const valueFields = result[1].split('&');
                    attributes[result[0]] = valueFields.map(valueField => option[valueField]).join('');
                }
            });
        }
        return <Option key={option.id.toString()} {...attributes}>{option.locationName || option.name}</Option>;
    });
}

/**
 * 获取距离当前时间day天的日期
 * @param day
 * @returns {string}
 */
export function getDay(day) {
    const today = new Date();
    const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

    // 注意，这行是关键代码
    today.setTime(targetday_milliseconds);

    const tYear = today.getFullYear();
    let tMonth = today.getMonth();
    let tDate = today.getDate();

    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);

    return tYear + '-' + tMonth + '-' + tDate;
}

/**
 * 格式化月，天
 * @param month
 * @returns {*}
 */
function doHandleMonth(month) {
    let m = month;
    if (month.toString().length == 1) {
        m = '0' + month;
    }
    return m;
}

/**
 * 获取url中参数
 * @param url
 * @param name
 * @returns {*}
 */
export function getParams(url, name) {
    url = url.replace(/&amp;/g, '&');
    let startIndex = url.indexOf('#');
    const returnObject = {};
    if (url.indexOf('?') > -1 && startIndex > -1) {
        startIndex = Math.min(url.indexOf('?'), url.indexOf('#'));
    } else if (url.indexOf('?') > -1) {
        startIndex = url.indexOf('?');
    }

    if (startIndex > -1) {
        url = url.substring(startIndex + 1);
        url = url.replace(/#/g, '&');
        const params = url.split('&');
        for (let i = 0, len = params.length, pname = null, pvalue = null; i < len; i++) {
            pname = params[i].split('=')[0].toLowerCase();
            if (params[i].indexOf('=') > -1) {
                pvalue = params[i].substring(params[i].indexOf('=') + 1);
            }
            pname = pname.indexOf('%u') > -1 ? unescape(pname) : pname;
            pvalue = (pvalue && pvalue.indexOf('%u') > -1) ? unescape(pvalue) : pvalue;
            returnObject[pname] = pvalue;
        }
        returnObject.hasUrlParams = '1';
    }
    if (name) {
        return returnObject && returnObject[name];
    }
    return returnObject;
}

/**
 * 判断对象是不是数组
 * @param obj
 * @returns {boolean}
 */
export function isArray(obj) {
    return Object.prototype.toString.apply(obj) == '[object Array]';
}

/**
 * 获取元素在数组中的位置
 * @param elem
 * @param arr
 * @param i
 * @returns {*}
 */
export function inArray(elem, arr, i) {
    let len;

    if (arr) {
        if (Array.indexOf) {
            return Array.indexOf.call(arr, elem, i);
        }

        len = arr.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

        for (; i < len; i++) {
            // Skip accessing in sparse arrays
            if (i in arr && arr[i] === elem) {
                return i;
            }
        }
    }

    return -1;
}

/**
 * 格式化表单数据
 * @param obj
 * @param options
 * @returns {*}
 */
export function getFormatFormData(obj, options) {
    const { dateFields, arrayFormItemFields, selectFields, objectFields, imgFields } = options;
    if (!obj) {
        return null;
    }
    let result = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (dateFields && dateFields.length > 0 && inArray(key, dateFields) !== -1) {
                if (isArray(obj[key])) {
                    result[key] = {
                        value: obj[key].map(item => moment(item)),
                    };
                } else {
                    result[key] = {
                        value: moment(obj[key]),
                    };
                }

            } else if (arrayFormItemFields && arrayFormItemFields.length > 0 && inArray(key, arrayFormItemFields) !== -1) {
                (obj[key] || []).forEach((item, index) => {
                    for (let curKey in item) {
                        if (item.hasOwnProperty(curKey)) {
                            let newKey = key + curKey.substring(0, 1).toUpperCase() + curKey.substring(1, curKey.length) + 's[' + index + ']';
                            result[newKey] = {
                                value: item[curKey],
                            };
                        }
                    }
                });
            } else if (selectFields && selectFields.length > 0 && inArray(key, selectFields) !== -1) {
                result[key] = {
                    value: (obj[key] !== null && obj[key] !== undefined && obj[key].toString()) || undefined,
                };
            } else if (objectFields && objectFields.length > 0 && inArray(key, objectFields) !== -1) {
                for (let objKey in obj[key]) {
                    if (obj[key].hasOwnProperty(objKey)) {
                        result[objKey] = {
                            value: obj[key][objKey],
                        };
                    }
                }
            } else if (imgFields && imgFields.length > 0 && inArray(key, imgFields) !== -1) {
                let fieldList = [];

                (obj[key] || []).forEach((item, index) => {
                    if (item) {
                        let current = item.split('/');
                        let name = current[current.length - 1];
                        fieldList.push({
                            key: -1 - index,
                            uid: -1 - index,
                            name: name,
                            status: 'done',
                            url: item,
                        });
                    }
                });

                result[key] = {
                    value: fieldList,
                };
            } else {
                result[key] = {
                    value: obj[key],
                };
            }
        }
    }

    return result;
}

/**
 * 格式化表单值，将值为undefined的表单值转为null
 * @param fields
 * @returns {{}}
 */
export function formatFields(fields) {
    const newFields = {};
    for (let x in fields) {
        if (fields.hasOwnProperty(x)) {
            newFields[x] = fields[x] !== undefined ? fields[x] : null;
        }
    }
    return newFields;
}
