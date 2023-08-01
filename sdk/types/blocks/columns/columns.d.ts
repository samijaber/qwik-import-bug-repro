import { SizeName } from "../../constants/device-sizes.js";
import { BuilderBlock } from "../../types/builder-block.js";
import { BuilderComponentsProp, PropsWithBuilderData } from "../../types/builder-props.js";
import { Dictionary } from "../../types/typescript.js";
type Column = {
    blocks: BuilderBlock[];
    width?: number;
};
type CSSVal = string | number;
type StackColumnsAt = "tablet" | "mobile" | "never";
export interface ColumnProps extends BuilderComponentsProp {
    columns?: Column[];
    builderBlock: BuilderBlock;
    space?: number;
    stackColumnsAt?: StackColumnsAt;
    reverseColumnsWhenStacked?: boolean;
}
export declare const getWidth: (props: any, state: any, index: number) => any;
export declare const getColumnCssWidth: (props: any, state: any, index: number) => string;
export declare const getTabletStyle: (props: any, state: any, { stackedStyle, desktopStyle, }: {
    stackedStyle: CSSVal;
    desktopStyle: CSSVal;
}) => CSSVal;
export declare const getMobileStyle: (props: any, state: any, { stackedStyle, desktopStyle, }: {
    stackedStyle: CSSVal;
    desktopStyle: CSSVal;
}) => CSSVal;
export declare const columnCssVars: (props: any, state: any, index: number) => Dictionary<string>;
export declare const getWidthForBreakpointSize: (props: any, state: any, size: SizeName) => number;
export declare const Columns: import("@builder.io/qwik").Component<PropsWithBuilderData<ColumnProps>>;
export default Columns;
export declare const STYLES = "\n.div-Columns {\n  display: flex;\n  line-height: normal;\n}\n.div-Columns-2 {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n";
