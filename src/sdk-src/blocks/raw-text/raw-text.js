import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { component$ } from "@builder.io/qwik";
export const RawText = component$((props) => {
    return (_jsx("span", { dangerouslySetInnerHTML: props.text?.toString() || "", class: props.attributes.class }));
});
export default RawText;
