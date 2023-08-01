import { getIdFromSearchParams } from './helpers';
import { init } from './init';
export function getPreviewContent(searchParams) {
    init();
    const id = getIdFromSearchParams(searchParams);
    return typeof id === 'string' ? globalThis._BUILDER_PREVIEW_LRU_CACHE.get(id) : undefined;
}
