import get from 'lodash.get';
import omit from 'lodash.omit';
import camelCase from 'camelcase';
import isEqual from 'lodash.isequal';
import pickBy from 'lodash.pickby';

const isNil = x => x === null || typeof x === 'undefined';

const isString = value => typeof value === 'string';

const isNumber = value => typeof value === 'number' && !Number.isNaN(value);

const clamp = (number, lower, upper) => Math.max(lower, Math.min(number, upper));

const uniq = arr => arr.reduce((acc, name) => (acc.includes(name) ? acc : [...acc, name]), []);

const isDef = n => n !== undefined && n !== null && !Number.isNaN(n);

const defaultTo = (value, defaultValue) => (isDef(value) ? value : defaultValue);

const camelToDash = str => (
    str
        .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
        .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)
);
const isFunction = fn => (
    fn && {}.toString.call(fn) === '[object Function]'
);


const noop = () => undefined;

const isObject = obj => obj === Object(obj);
// This is the fastest way for small objects - https://jsperf.com/empty-object-test/4

const isEmptyObject = obj => Object.keys(obj).length === 0;

const isEmptyArray = array => (array === undefined || array.length === 0);

const isEmpty = value => (isObject(value) && isEmptyObject(value)) || !isDef(value) || value === '';

const identity = x => x;

function debounce(func, wait, immediate) {
    let timeout;

    function debounceWrapper(...args) {
        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        }, wait);

        if (callNow) func.apply(this, args);
    }

    return debounceWrapper;
}
const qsParse = str => str
    .split('&')
    .map(kp => kp.split('='))
    .reduce((acc, next) => (next[0] ? ({ ...acc, [next[0]]: next[1] }) : acc), {});

export {
    camelToDash,
    clamp,
    debounce,
    defaultTo,
    isDef,
    isEmpty,
    isEmptyObject,
    isEmptyArray,
    isFunction,
    isString,
    isNumber,
    isObject,
    isNil,
    identity,
    get,
    noop,
    uniq,
    qsParse,
    omit,
    camelCase,
    isEqual,
    pickBy,
};
