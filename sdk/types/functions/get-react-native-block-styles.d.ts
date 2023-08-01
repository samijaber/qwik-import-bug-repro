import type { BuilderContextInterface } from '../context/types.js';
import type { BuilderBlock } from '../types/builder-block.js';
export declare function getReactNativeBlockStyles({ block, context, blockStyles }: {
    block: BuilderBlock;
    context: BuilderContextInterface;
    blockStyles: any;
}): CSSStyleDeclaration | Record<string, string | undefined>;
