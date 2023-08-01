import { isBrowser } from './is-browser.js';
const settings = {};
export function setEditorSettings(newSettings) {
    if (isBrowser()) {
        Object.assign(settings, newSettings);
        const message = {
            type: 'builder.settingsChange',
            data: settings
        };
        parent.postMessage(message, '*');
    }
}