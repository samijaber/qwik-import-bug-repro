import { fastClone } from './fast-clone.js';
/**
 * @deprecated.  Use the `customComponents` prop in RenderContent instead to provide your custom components to the builder SDK.
 */
export const components = [];
/**
 * @deprecated.  Use the `customComponents` prop in RenderContent instead to provide your custom components to the builder SDK.
 */
export function registerComponent(component, info) {
    components.push({
        component,
        ...info
    });
    console.warn('registerComponent is deprecated. Use the `customComponents` prop in RenderContent instead to provide your custom components to the builder SDK.');
    return component;
}
export const createRegisterComponentMessage = (info) => ({
    type: 'builder.registerComponent',
    data: info
});
// eslint-disable-next-line @typescript-eslint/ban-types
const serializeFn = (fnValue) => {
    const fnStr = fnValue.toString().trim();
    // we need to account for a few different fn syntaxes:
    // 1. `function name(args) => {code}`
    // 2. `name(args) => {code}`
    // 3. `(args) => {}`
    const appendFunction = !fnStr.startsWith('function') && !fnStr.startsWith('(');
    return `return (${appendFunction ? 'function ' : ''}${fnStr}).apply(this, arguments)`;
};
const serializeValue = (value) => typeof value === 'function' ? serializeFn(value) : fastClone(value);
export const serializeComponentInfo = ({ inputs, ...info }) => ({
    ...fastClone(info),
    inputs: inputs?.map(input => Object.entries(input).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: serializeValue(value)
    }), {}))
});