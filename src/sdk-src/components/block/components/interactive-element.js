import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { getBlockActions } from "../../../functions/get-block-actions.js";
import { getBlockProperties } from "../../../functions/get-block-properties.js";
import { Slot, component$ } from "@builder.io/qwik";
export const InteractiveElement = component$((props) => {
    return (_jsx(props.Wrapper, { ...props.wrapperProps, attributes: {
            ...getBlockProperties({
                block: props.block,
                context: props.context,
            }),
            ...getBlockActions({
                block: props.block,
                rootState: props.context.rootState,
                rootSetState: props.context.rootSetState,
                localState: props.context.localState,
                context: props.context.context,
            }),
        }, children: _jsx(Slot, {}) }));
});
export default InteractiveElement;
