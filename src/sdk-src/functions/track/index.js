import { TARGET } from '../../constants/target.js';
import { logger } from '../../helpers/logger.js';
import { getSessionId } from '../../helpers/sessionId.js';
import { getVisitorId } from '../../helpers/visitorId.js';
import { isBrowser } from '../is-browser.js';
import { isEditing } from '../is-editing.js';
import { getUserAttributes } from './helpers.js';
const getTrackingEventData = async ({ canTrack }) => {
    if (!canTrack) {
        return {
            visitorId: undefined,
            sessionId: undefined
        };
    }
    const sessionId = await getSessionId({
        canTrack
    });
    const visitorId = getVisitorId({
        canTrack
    });
    return {
        sessionId,
        visitorId
    };
};
const createEvent = async ({ type: eventType, canTrack, apiKey, metadata, ...properties }) => ({
    type: eventType,
    data: {
        ...properties,
        metadata: {
            url: location.href,
            ...metadata
        },
        ...(await getTrackingEventData({
            canTrack
        })),
        userAttributes: getUserAttributes(),
        ownerId: apiKey
    }
});
async function _track(eventProps) {
    if (!eventProps.apiKey) {
        logger.error('Missing API key for track call. Please provide your API key.');
        return;
    }
    if (!eventProps.canTrack) {
        return;
    }
    if (isEditing()) {
        return;
    }
    if (!(isBrowser() || TARGET === 'reactNative')) {
        return;
    }
    return fetch(`https://cdn.builder.io/api/v1/track`, {
        method: 'POST',
        body: JSON.stringify({
            events: [await createEvent(eventProps)]
        }),
        headers: {
            'content-type': 'application/json'
        },
        mode: 'cors'
    }).catch(err => {
        console.error('Failed to track: ', err);
    });
}
export const track = (args) => _track({
    canTrack: true,
    ...args
});
