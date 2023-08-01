/**
 * Convert deep object to a flat object with dots
 *
 * { foo: { bar: 'baz' }} -> { 'foo.bar': 'baz' }
 */
export function flatten(object, path = null, separator = '.') {
    return Object.keys(object).reduce((acc, key) => {
        const value = object[key];
        const newPath = [path, key].filter(Boolean).join(separator);
        const isObject = [typeof value === 'object', value !== null, !(Array.isArray(value) && value.length === 0)].every(Boolean);
        return isObject ? {
            ...acc,
            ...flatten(value, newPath, separator)
        } : {
            ...acc,
            [newPath]: value
        };
    }, {});
}
