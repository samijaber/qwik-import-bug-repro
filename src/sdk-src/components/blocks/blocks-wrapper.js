import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { isEditing } from "../../functions/is-editing.js";
import { Slot, component$, useComputed$, useStylesScoped$, } from "@builder.io/qwik";
export const onClick = function onClick(props, state) {
    if (isEditing() && !props.blocks?.length) {
        window.parent?.postMessage({
            type: "builder.clickEmptyBlocks",
            data: {
                parentElementId: props.parent,
                dataPath: props.path,
            },
        }, "*");
    }
};
export const onMouseEnter = function onMouseEnter(props, state) {
    if (isEditing() && !props.blocks?.length) {
        window.parent?.postMessage({
            type: "builder.hoverEmptyBlocks",
            data: {
                parentElementId: props.parent,
                dataPath: props.path,
            },
        }, "*");
    }
};
export const BlocksWrapper = component$((props) => {
    useStylesScoped$(STYLES);
    const className = useComputed$(() => {
        return "builder-blocks" + (!props.blocks?.length ? " no-blocks" : "");
    });
    const state = {};
    return (_jsx("div", { class: className.value + " div-BlocksWrapper", "builder-path": props.path, "builder-parent-id": props.parent, style: props.styleProp, "onClick$": (event) => onClick(props, state), "onMouseEnter$": (event) => onMouseEnter(props, state), "onKeyPress$": (event) => onClick(props, state), children: _jsx(Slot, {}) }));
});
export default BlocksWrapper;
export const STYLES = `
.div-BlocksWrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
`;
