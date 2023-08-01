import { isBrowser } from '../functions/is-browser.js';
const getLocalStorage = () => isBrowser() && typeof localStorage !== 'undefined' ? localStorage : undefined;
export const getLocalStorageItem = ({ key, canTrack }) => {
    try {
        if (canTrack) {
            return getLocalStorage()?.getItem(key);
        }
        return undefined;
    }
    catch (err) {
        console.debug('[LocalStorage] GET error: ', err);
        return undefined;
    }
};
export const setLocalStorageItem = ({ key, canTrack, value }) => {
    try {
        if (canTrack) {
            getLocalStorage()?.setItem(key, value);
        }
    }
    catch (err) {
        console.debug('[LocalStorage] SET error: ', err);
    }
};
