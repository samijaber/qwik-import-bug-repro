const SCRIPT_MIME_TYPES = ['text/javascript', 'application/javascript', 'application/ecmascript'];
export const isJsScript = (script) => SCRIPT_MIME_TYPES.includes(script.type);