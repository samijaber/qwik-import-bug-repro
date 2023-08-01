import { BuilderContextInterface } from "../../../context/types.js";
import { BuilderBlock } from "../../../types/builder-block.js";
import { PropsWithChildren } from "../../../types/typescript.js";
export type InteractiveElementProps = {
    Wrapper: any;
    block: BuilderBlock;
    context: BuilderContextInterface;
    wrapperProps: object;
};
export declare const InteractiveElement: import("@builder.io/qwik").Component<PropsWithChildren<InteractiveElementProps>>;
export default InteractiveElement;
