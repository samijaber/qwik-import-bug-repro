import { BuilderContent } from "../../types/builder-content.js";
import { BuilderComponentsProp, PropsWithBuilderData } from "../../types/builder-props.js";
/**
 * This import is used by the Svelte SDK. Do not remove.
 */ export interface SymbolInfo {
    model?: string;
    entry?: string;
    data?: any;
    content?: BuilderContent;
    inline?: boolean;
    dynamic?: boolean;
}
/**
 * This import is used by the Svelte SDK. Do not remove.
 */ export interface SymbolProps extends BuilderComponentsProp {
    symbol?: SymbolInfo;
    dataOnly?: boolean;
    dynamic?: boolean;
    attributes?: any;
    inheritState?: boolean;
}
export declare const setContent: (props: any, state: any) => void;
export declare const Symbol: import("@builder.io/qwik").Component<PropsWithBuilderData<SymbolProps>>;
export default Symbol;
