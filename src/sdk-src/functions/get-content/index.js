import { TARGET } from '../../constants/target.js';
import { handleABTesting } from '../../helpers/ab-tests.js';
import { getDefaultCanTrack } from '../../helpers/canTrack.js';
import { logger } from '../../helpers/logger.js';
import { getPreviewContent } from '../../helpers/preview-lru-cache/get.js';
import { fetch } from '../get-fetch.js';
import { isBrowser } from '../is-browser.js';
import { generateContentUrl } from './generate-content-url.js';
const checkContentHasResults = (content) => 'results' in content;
export async function getContent(options) {
    const allContent = await getAllContent({
        ...options,
        limit: 1
    });
    if (allContent) {
        return allContent.results[0] || null;
    }
    return null;
}
const fetchContent = async (options) => {
    const url = generateContentUrl(options);
    const res = await fetch(url.href);
    const content = await res.json();
    return content;
};
/**
 * Exported only for testing purposes. Should not be used directly.
 */
export const processContentResult = async (options, content, url = generateContentUrl(options)) => {
    const canTrack = getDefaultCanTrack(options.canTrack);
    const isPreviewing = url.search.includes(`preview=`);
    if (TARGET === 'rsc' && isPreviewing) {
        const newResults = [];
        for (const item of content.results) {
            const previewContent = getPreviewContent(url.searchParams);
            newResults.push(previewContent || item);
        }
        content.results = newResults;
    }
    if (!canTrack)
        return content;
    if (!(isBrowser() || TARGET === 'reactNative'))
        return content;
    /**
     * For client-side navigations, it is ideal to handle AB testing at this point instead of using our
     * complex multi-rendering variants approach, which is only needed for SSR'd content.
     *
     * This is also where react-native would handle AB testing.
     */
    try {
        const newResults = [];
        for (const item of content.results) {
            newResults.push(await handleABTesting({
                item,
                canTrack
            }));
        }
        content.results = newResults;
    }
    catch (e) {
        logger.error('Could not process A/B tests. ', e);
    }
    return content;
};
export async function getAllContent(options) {
    try {
        const url = generateContentUrl(options);
        const content = await fetchContent(options);
        if (!checkContentHasResults(content)) {
            logger.error('Error fetching data. ', {
                url,
                content,
                options
            });
            return null;
        }
        return processContentResult(options, content);
    }
    catch (error) {
        logger.error('Error fetching data. ', error);
        return null;
    }
}