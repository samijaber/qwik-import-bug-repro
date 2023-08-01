import { BuilderContextInterface, RegisteredComponents } from "../../context/types.js";
import { BuilderBlock } from "../../types/builder-block.js";
export type BlockProps = {
    block: BuilderBlock;
    context: BuilderContextInterface;
    registeredComponents: RegisteredComponents;
};
export declare const Block: import("@builder.io/qwik").Component<BlockProps>;
export default Block;
