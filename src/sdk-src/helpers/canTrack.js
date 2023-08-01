import { checkIsDefined } from './nullable.js';
export const getDefaultCanTrack = (canTrack) => checkIsDefined(canTrack) ? canTrack : true;
