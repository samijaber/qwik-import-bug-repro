import { TARGET } from '../constants/target.js';
import { isIframe } from './is-iframe.js';
export function isEditing() {
    return isIframe() && (TARGET === 'reactNative' || window.location.search.indexOf('builder.frameEditing=') !== -1);
}
