import { BuilderContextInterface, RegisteredComponents } from "../../context/types.js";
import { BlocksWrapperProps } from "./blocks-wrapper";
export type BlocksProps = Partial<BlocksWrapperProps> & {
    context?: BuilderContextInterface;
    registeredComponents?: RegisteredComponents;
};
export declare const Blocks: import("@builder.io/qwik").Component<BlocksProps>;
export default Blocks;
