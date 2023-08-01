import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { component$ } from "@builder.io/qwik";
export const SubmitButton = component$((props) => {
    return (_jsx("button", { type: "submit", ...props.attributes, children: props.text }));
});
export default SubmitButton;
