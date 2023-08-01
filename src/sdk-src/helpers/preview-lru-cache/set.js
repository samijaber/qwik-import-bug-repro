'use server';
import { init } from './init';
export async function postPreviewContent({ key, value }) {
    init();
    globalThis._BUILDER_PREVIEW_LRU_CACHE.set(key, value);
    return {
        [key]: value
    };
}
