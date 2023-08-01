import { BuilderContextInterface } from "../../../context/types.js";
import { BuilderBlock } from "../../../types/builder-block.js";
export type BlockStylesProps = {
    block: BuilderBlock;
    context: BuilderContextInterface;
};
export declare const BlockStyles: import("@builder.io/qwik").Component<BlockStylesProps>;
export default BlockStyles;
