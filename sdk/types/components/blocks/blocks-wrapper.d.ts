import { BuilderBlock } from "../../types/builder-block.js";
import { PropsWithChildren } from "../../types/typescript.js";
export type BlocksWrapperProps = {
    blocks: BuilderBlock[] | undefined;
    parent: string | undefined;
    path: string | undefined;
    styleProp: Record<string, any> | undefined;
};
export declare const onClick: (props: any, state: any) => void;
export declare const onMouseEnter: (props: any, state: any) => void;
export declare const BlocksWrapper: import("@builder.io/qwik").Component<PropsWithChildren<BlocksWrapperProps>>;
export default BlocksWrapper;
export declare const STYLES = "\n.div-BlocksWrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n";
