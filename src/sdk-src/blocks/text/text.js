import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { component$ } from "@builder.io/qwik";
export const Text = component$((props) => {
    return (_jsx("span", { class: "builder-text", dangerouslySetInnerHTML: props.text?.toString() || "", style: {
            outline: "none",
        } }));
});
export default Text;
