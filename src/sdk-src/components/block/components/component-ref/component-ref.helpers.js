import { getBlockProperties } from '../../../../functions/get-block-properties.js';
export const getWrapperProps = ({ componentOptions, builderBlock, context, componentRef, includeBlockProps, isInteractive, contextValue }) => {
    const interactiveElementProps = {
        Wrapper: componentRef,
        block: builderBlock,
        context,
        wrapperProps: componentOptions
    };
    return isInteractive ? interactiveElementProps : {
        ...componentOptions,
        /**
         * If `noWrap` is set to `true`, then the block's props/attributes are provided to the
         * component itself directly. Otherwise, they are provided to the wrapper element.
         */
        ...(includeBlockProps ? {
            attributes: getBlockProperties({
                block: builderBlock,
                context: contextValue
            })
        } : {})
    };
};
