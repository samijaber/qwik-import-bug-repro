import { isBrowser } from '../functions/is-browser.js';
import { logger } from './logger.js';
import { checkIsDefined } from './nullable.js';
import { getTopLevelDomain } from './url.js';
export const getCookieSync = ({ name, canTrack }) => {
    try {
        if (!canTrack) {
            return undefined;
        }
        /**
         * Extracted from MDN docs
         * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#example_2_get_a_sample_cookie_named_test2
         */
        return document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1];
    }
    catch (err) {
        logger.warn('[COOKIE] GET error: ', err?.message || err);
        return undefined;
    }
};
/**
 * NOTE: This function is `async` because its react-native override is async. Do not remove the `async` keyword!
 * The sync version is only safe to use in code blocks that `react-native` is guaranteed not to not run.
 */
export const getCookie = async (args) => getCookieSync(args);
const stringifyCookie = (cookie) => cookie.map(([key, value]) => value ? `${key}=${value}` : key).filter(checkIsDefined).join('; ');
const SECURE_CONFIG = [['secure', ''], ['SameSite', 'None']];
const createCookieString = ({ name, value, expires }) => {
    const secure = isBrowser() ? location.protocol === 'https:' : true;
    const secureObj = secure ? SECURE_CONFIG : [[]];
    // TODO: need to know if secure server side
    const expiresObj = expires ? [['expires', expires.toUTCString()]] : [[]];
    const cookieValue = [[name, value], ...expiresObj, ['path', '/'], ['domain', getTopLevelDomain(window.location.hostname)], ...secureObj];
    const cookie = stringifyCookie(cookieValue);
    return cookie;
};
/**
 * NOTE: This function is `async` because its react-native override is async. Do not remove the `async` keyword!
 */
export const setCookie = async ({ name, value, expires, canTrack }) => {
    try {
        if (!canTrack) {
            return;
        }
        const cookie = createCookieString({
            name,
            value,
            expires
        });
        document.cookie = cookie;
    }
    catch (err) {
        logger.warn('[COOKIE] SET error: ', err?.message || err);
    }
};
