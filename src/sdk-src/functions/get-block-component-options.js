export function getBlockComponentOptions(block) {
    return {
        ...block.component?.options,
        ...block.options,
        /**
         * Our built-in components frequently make use of the block, so we provide all of it under `builderBlock`
         */
        builderBlock: block
    };
}
