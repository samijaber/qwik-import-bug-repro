import { getCookie, getCookieSync, setCookie } from './cookie.js';
import { checkIsDefined } from '../helpers/nullable.js';
import { logger } from './logger.js';
import { TARGET } from '../constants/target.js';
const BUILDER_STORE_PREFIX = 'builder.tests';
const getContentTestKey = (id) => `${BUILDER_STORE_PREFIX}.${id}`;
const getContentVariationCookie = ({ contentId }) => getCookie({
    name: getContentTestKey(contentId),
    canTrack: true
});
const getContentVariationCookieSync = ({ contentId }) => getCookieSync({
    name: getContentTestKey(contentId),
    canTrack: true
});
const setContentVariationCookie = ({ contentId, value }) => setCookie({
    name: getContentTestKey(contentId),
    value,
    canTrack: true
});
const checkIsBuilderContentWithVariations = (item) => checkIsDefined(item.id) && checkIsDefined(item.variations) && Object.keys(item.variations).length > 0;
/**
 * Randomly assign a variation to a user
 */
const getRandomVariationId = ({ id, variations }) => {
    let n = 0;
    const random = Math.random();
    // loop over variations test ratios, incrementing a counter,
    // until we find the variation that this user should be assigned to
    for (const id in variations) {
        const testRatio = variations[id]?.testRatio;
        n += testRatio;
        if (random < n) {
            return id;
        }
    }
    // the variations array does not include the default variation.
    // if we arrive here, then it means that the random number fits in the default variation bucket.
    return id;
};
const getAndSetVariantId = (args) => {
    // if variation not found in storage, assign a random variation to this user
    const randomVariationId = getRandomVariationId(args);
    // store variation in cookies/storage
    setContentVariationCookie({
        contentId: args.id,
        value: randomVariationId
    }).catch(err => {
        logger.error('could not store A/B test variation: ', err);
    });
    return randomVariationId;
};
const getTestFields = ({ item, testGroupId }) => {
    const variationValue = item.variations[testGroupId];
    if (testGroupId === item.id ||
        // handle edge-case where `testGroupId` points to non-existing variation
        !variationValue) {
        return {
            testVariationId: item.id,
            testVariationName: 'Default'
        };
    }
    else {
        return {
            data: variationValue.data,
            testVariationId: variationValue.id,
            testVariationName: variationValue.name || (variationValue.id === item.id ? 'Default' : '')
        };
    }
};
export const handleABTestingSync = ({ item, canTrack }) => {
    /**
     * We cannot SSR in React-Native.
     */
    if (TARGET === 'reactNative')
        return item;
    if (!canTrack) {
        return item;
    }
    if (!item) {
        return undefined;
    }
    if (!checkIsBuilderContentWithVariations(item)) {
        return item;
    }
    const testGroupId = getContentVariationCookieSync({
        contentId: item.id
    }) || getAndSetVariantId({
        variations: item.variations,
        id: item.id
    });
    const variationValue = getTestFields({
        item,
        testGroupId
    });
    return {
        ...item,
        ...variationValue
    };
};
export const handleABTesting = async ({ item, canTrack }) => {
    if (!canTrack) {
        return item;
    }
    if (!checkIsBuilderContentWithVariations(item)) {
        return item;
    }
    const cookieValue = await getContentVariationCookie({
        contentId: item.id
    });
    const testGroupId = cookieValue || getAndSetVariantId({
        variations: item.variations,
        id: item.id
    });
    const variationValue = getTestFields({
        item,
        testGroupId
    });
    return {
        ...item,
        ...variationValue
    };
};
