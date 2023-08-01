import { BuilderContextInterface, RegisteredComponents } from "../../../context/types.js";
import { BuilderBlock } from "../../../types/builder-block.js";
type Props = {
    block: BuilderBlock;
    repeatContext: BuilderContextInterface;
    registeredComponents: RegisteredComponents;
};
export declare const RepeatedBlock: import("@builder.io/qwik").Component<Props>;
export default RepeatedBlock;
