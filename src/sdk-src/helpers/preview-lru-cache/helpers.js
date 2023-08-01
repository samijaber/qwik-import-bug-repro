import { logger } from '../logger';
export const getIdFromSearchParams = (searchParams) => {
    const previewedModel = searchParams.get('preview');
    const previewedId = searchParams.get('overrides.' + previewedModel);
    if (!previewedId) {
        logger.warn('No previewed ID found in search params.');
    }
    return previewedId;
};
