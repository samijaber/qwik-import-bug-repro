import type { BuilderContent } from '../../types/builder-content.js';
import type { GetContentOptions } from './types.js';
export declare function getContent(options: GetContentOptions): Promise<BuilderContent | null>;
type ContentResults = {
    results: BuilderContent[];
};
/**
 * Exported only for testing purposes. Should not be used directly.
 */
export declare const processContentResult: (options: GetContentOptions, content: ContentResults, url?: URL) => Promise<ContentResults>;
export declare function getAllContent(options: GetContentOptions): Promise<ContentResults | null>;
export {};
