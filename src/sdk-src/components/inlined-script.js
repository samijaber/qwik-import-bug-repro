import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { component$ } from "@builder.io/qwik";
export const InlinedScript = component$((props) => {
    return (_jsx("script", { dangerouslySetInnerHTML: props.scriptStr, id: props.id }));
});
export default InlinedScript;
