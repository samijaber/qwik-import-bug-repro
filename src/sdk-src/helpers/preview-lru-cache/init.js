/**
 * This is an LRU cache to hold preview content on the server-side.
 *
 * Note: This logic is only used by the NextJS SDK.
 */
import { LRUCache } from 'lru-cache';
export function init() {
    if (!globalThis._BUILDER_PREVIEW_LRU_CACHE) {
        globalThis._BUILDER_PREVIEW_LRU_CACHE = new LRUCache({
            max: 500,
            // how long to live in ms
            ttl: 1000 * 60 * 5
        });
    }
}
