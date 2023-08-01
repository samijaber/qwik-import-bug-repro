import type { BuilderContextInterface, RegisteredComponents } from '../../context/types.js';
import type { BuilderBlock } from '../../types/builder-block.js';
import type { RepeatData } from './types.js';
export declare const isEmptyHtmlElement: (tagName: unknown) => boolean;
export declare const getComponent: ({ block, context, registeredComponents }: {
    block: BuilderBlock;
    context: BuilderContextInterface;
    registeredComponents: RegisteredComponents;
}) => import("../../context/types.js").RegisteredComponent | null | undefined;
export declare const getRepeatItemData: ({ block, context }: {
    block: BuilderBlock;
    context: BuilderContextInterface;
}) => RepeatData[] | undefined;
