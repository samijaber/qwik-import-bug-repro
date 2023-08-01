import { getContent } from '../../functions/get-content/index.js';
import { logger } from '../../helpers/logger.js';
export const fetchContent = async ({ builderContextValue, symbol }) => {
    /**
     * If:
     * - we have a symbol prop
     * - yet it does not have any content
     * - and we have not already stored content from before
     * - and it has a model name
     *
     * then we want to re-fetch the symbol content.
     */
    if (symbol?.model &&
        // This is a hack, we should not need to check for this, but it is needed for Svelte.
        builderContextValue?.apiKey) {
        return getContent({
            model: symbol.model,
            apiKey: builderContextValue.apiKey,
            apiVersion: builderContextValue.apiVersion,
            ...(symbol?.entry && {
                query: {
                    id: symbol.entry
                }
            })
        }).catch(err => {
            logger.error('Could not fetch symbol content: ', err);
            return undefined;
        });
    }
    return undefined;
};
