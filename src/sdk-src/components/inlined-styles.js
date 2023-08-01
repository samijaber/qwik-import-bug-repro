import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { component$ } from "@builder.io/qwik";
export const InlinedStyles = component$((props) => {
    return _jsx("style", { dangerouslySetInnerHTML: props.styles, id: props.id });
});
export default InlinedStyles;
