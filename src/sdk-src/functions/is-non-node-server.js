import { isBrowser } from './is-browser';
/**
 * Identifies non-node server runtimes (edge, workers, serverless, etc.)
 */
export function isNonNodeServer() {
    const hasNode = () => typeof process !== 'undefined' && process?.versions?.node;
    return !isBrowser() && !hasNode();
}
