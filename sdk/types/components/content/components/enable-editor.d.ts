import { BuilderContextInterface } from "../../../context/types.js";
import { BuilderContent } from "../../../types/builder-content.js";
import { ContentProps } from "../content.types.js";
type BuilderEditorProps = Omit<ContentProps, "customComponents" | "data" | "apiVersion" | "isSsrAbTest"> & {
    builderContextSignal: BuilderContextInterface;
    setBuilderContextSignal?: (signal: any) => any;
    children?: any;
};
export declare const mergeNewContent: (props: any, state: any, elementRef: any, newContent: BuilderContent) => void;
export declare const processMessage: (props: any, state: any, elementRef: any, event: MessageEvent) => void;
export declare const evaluateJsCode: (props: any, state: any, elementRef: any) => void;
export declare const onClick: (props: any, state: any, elementRef: any, event: any) => void;
export declare const evalExpression: (props: any, state: any, elementRef: any, expression: string) => string;
export declare const handleRequest: (props: any, state: any, elementRef: any, { url, key, }: {
    key: string;
    url: string;
}) => void;
export declare const runHttpRequests: (props: any, state: any, elementRef: any) => void;
export declare const emitStateUpdate: (props: any, state: any, elementRef: any) => void;
export declare const EnableEditor: import("@builder.io/qwik").Component<BuilderEditorProps>;
export default EnableEditor;
