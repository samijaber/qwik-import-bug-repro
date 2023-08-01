import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { component$ } from "@builder.io/qwik";
export const Textarea = component$((props) => {
    return (_jsx("textarea", { ...props.attributes, placeholder: props.placeholder, name: props.name, value: props.value, defaultValue: props.defaultValue }));
});
export default Textarea;
