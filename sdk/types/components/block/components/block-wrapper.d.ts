import { BuilderContextInterface } from "../../../context/types.js";
import { BuilderBlock } from "../../../types/builder-block.js";
import { PropsWithChildren } from "../../../types/typescript.js";
/**
 * This import is used by the Svelte SDK. Do not remove.
 */ type BlockWrapperProps = {
    Wrapper: string;
    block: BuilderBlock;
    context: BuilderContextInterface;
    hasChildren: boolean;
};
/**
 * This component renders a block's wrapper HTML element (from the block's `tagName` property).
 * It reuses the exact same logic as the `InteractiveElement` component, but we need to have 2 separate components for
 * Svelte's sake, as it needs to know at compile-time whether to use:
 *  - `<svelte:element>` (for HTML element) or
 *  - `<svelte:component>` (for custom components)
 */
export declare const BlockWrapper: import("@builder.io/qwik").Component<PropsWithChildren<BlockWrapperProps>>;
export default BlockWrapper;
