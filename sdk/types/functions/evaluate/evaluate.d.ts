import type { ExecutorArgs } from "./types.js";
export declare function evaluate({ code, context, localState, rootState, rootSetState, event, isExpression, }: {
    code: string;
    event?: Event;
    isExpression?: boolean;
} & Pick<any, "localState" | "context" | "rootState" | "rootSetState">): any;
export declare const runInBrowser: ({ useCode, builder, context, event, localState, rootSetState, rootState, }: ExecutorArgs) => any;
export declare const runInNode: (args: ExecutorArgs) => any;
export declare function flattenState(rootState: Record<string | symbol, any>, localState: Record<string | symbol, any> | undefined, rootSetState: ((rootState: any) => void) | undefined): any;
