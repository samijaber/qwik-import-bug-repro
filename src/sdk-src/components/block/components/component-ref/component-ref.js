import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@builder.io/qwik/jsx-runtime";
import Block from "../../block";
import BlockStyles from "../block-styles";
import InteractiveElement from "../interactive-element";
import { getWrapperProps } from "./component-ref.helpers.js";
import { component$, useStore } from "@builder.io/qwik";
export const ComponentRef = component$((props) => {
    const state = useStore({
        Wrapper: props.isInteractive ? InteractiveElement : props.componentRef,
    });
    return (_jsx(_Fragment, { children: props.componentRef ? (_jsxs(state.Wrapper, { ...getWrapperProps({
                componentOptions: props.componentOptions,
                builderBlock: props.builderBlock,
                context: props.context,
                componentRef: props.componentRef,
                includeBlockProps: props.includeBlockProps,
                isInteractive: props.isInteractive,
                contextValue: props.context,
            }), children: [(props.blockChildren || []).map(function (child) {
                    return (_jsx(Block, { block: child, context: props.context, registeredComponents: props.registeredComponents }, "block-" + child.id));
                }), (props.blockChildren || []).map(function (child) {
                    return (_jsx(BlockStyles, { block: child, context: props.context }, "block-style-" + child.id));
                })] })) : null }));
});
export default ComponentRef;
