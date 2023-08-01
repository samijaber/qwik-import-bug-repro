import { isBrowser } from './is-browser.js';
import { isEditing } from './is-editing.js';
export const isNode = () => {
    return typeof window === 'undefined';
};
export function evaluate({ code, context, localState, rootState, rootSetState, event, isExpression = true }) {
    if (code === '') {
        console.warn('Skipping evaluation of empty code block.');
        return;
    }
    const builder = {
        isEditing: isEditing(),
        isBrowser: isBrowser(),
        isServer: !isBrowser()
    };
    // Be able to handle simple expressions like "state.foo" or "1 + 1"
    // as well as full blocks like "var foo = "bar"; return foo"
    const useReturn = 
    // we disable this for cases where we definitely don't want a return
    isExpression && !(code.includes(';') || code.includes(' return ') || code.trim().startsWith('return '));
    const useCode = useReturn ? `return (${code});` : code;
    const state = flattenState(rootState, localState, rootSetState);
    const args = {
        useCode,
        builder,
        state,
        context,
        event
    };
    if (isBrowser())
        return runInBrowser(args);
    if (isNode())
        return runInNode(args);
    return runInBrowser(args);
}
export const runInBrowser = ({ useCode, builder, state, context, event }) => {
    try {
        return new Function('builder', 'Builder' /* <- legacy */, 'state', 'context', 'event', useCode)(builder, builder, state, context, event);
    }
    catch (e) {
        console.warn('Builder custom code error: \n While Evaluating: \n ', useCode, '\n', e);
    }
};
export const runInNonNode = ({ useCode, builder, state, context, event }) => { };
export const runInNode = (args) => {
    return runInBrowser(args);
};
export function flattenState(rootState, localState, rootSetState) {
    if (rootState === localState) {
        throw new Error('rootState === localState');
    }
    return new Proxy(rootState, {
        get: (_, prop) => {
            if (localState && prop in localState) {
                return localState[prop];
            }
            return rootState[prop];
        },
        set: (_, prop, value) => {
            if (localState && prop in localState) {
                throw new Error('Writing to local state is not allowed as it is read-only.');
            }
            rootState[prop] = value;
            rootSetState?.(rootState);
            return true;
        }
    });
}
