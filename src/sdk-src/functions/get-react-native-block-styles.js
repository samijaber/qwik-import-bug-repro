import { sanitizeReactNativeBlockStyles } from './sanitize-react-native-block-styles.js';
export function getReactNativeBlockStyles({ block, context, blockStyles }) {
    const responsiveStyles = block.responsiveStyles;
    if (!responsiveStyles) {
        return {};
    }
    const styles = {
        // recursively apply inherited styles so that they can be passed down to children `Text` blocks
        ...context.inheritedStyles,
        ...(responsiveStyles.large || {}),
        ...(responsiveStyles.medium || {}),
        ...(responsiveStyles.small || {}),
        ...blockStyles
    };
    const newStyles = sanitizeReactNativeBlockStyles(styles);
    return newStyles;
}
