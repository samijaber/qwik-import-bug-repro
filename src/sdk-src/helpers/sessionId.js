import { getCookie, setCookie } from './cookie.js';
import { checkIsDefined } from './nullable.js';
import { uuid } from './uuid.js';
const SESSION_LOCAL_STORAGE_KEY = 'builderSessionId';
export const getSessionId = async ({ canTrack }) => {
    if (!canTrack) {
        return undefined;
    }
    const sessionId = await getCookie({
        name: SESSION_LOCAL_STORAGE_KEY,
        canTrack
    });
    if (checkIsDefined(sessionId)) {
        return sessionId;
    }
    else {
        const newSessionId = createSessionId();
        setSessionId({
            id: newSessionId,
            canTrack
        });
        return newSessionId;
    }
};
export const createSessionId = () => uuid();
export const setSessionId = ({ id, canTrack }) => setCookie({
    name: SESSION_LOCAL_STORAGE_KEY,
    value: id,
    canTrack
});
