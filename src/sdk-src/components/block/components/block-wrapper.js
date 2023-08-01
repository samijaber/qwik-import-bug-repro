import { jsx as _jsx, Fragment as _Fragment } from "@builder.io/qwik/jsx-runtime";
import { getBlockActions } from "../../../functions/get-block-actions.js";
import { getBlockProperties } from "../../../functions/get-block-properties.js";
import { Slot, component$ } from "@builder.io/qwik";
/**
 * This component renders a block's wrapper HTML element (from the block's `tagName` property).
 * It reuses the exact same logic as the `InteractiveElement` component, but we need to have 2 separate components for
 * Svelte's sake, as it needs to know at compile-time whether to use:
 *  - `<svelte:element>` (for HTML element) or
 *  - `<svelte:component>` (for custom components)
 */
export const BlockWrapper = component$((props) => {
    return (_jsx(_Fragment, { children: props.hasChildren ? (_jsx(props.Wrapper, { ...getBlockProperties({
                block: props.block,
                context: props.context,
            }), ...getBlockActions({
                block: props.block,
                rootState: props.context.rootState,
                rootSetState: props.context.rootSetState,
                localState: props.context.localState,
                context: props.context.context,
                stripPrefix: true,
            }), children: _jsx(Slot, {}) })) : (_jsx(props.Wrapper, { ...getBlockProperties({
                block: props.block,
                context: props.context,
            }), ...getBlockActions({
                block: props.block,
                rootState: props.context.rootState,
                rootSetState: props.context.rootSetState,
                localState: props.context.localState,
                context: props.context.context,
                stripPrefix: true,
            }) })) }));
});
export default BlockWrapper;
