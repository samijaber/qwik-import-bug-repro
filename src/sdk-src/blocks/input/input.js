import { createElement as _createElement } from "@builder.io/qwik";
import { isEditing } from "../../functions/is-editing.js";
import { component$ } from "@builder.io/qwik";
export const FormInputComponent = component$((props) => {
    return (_createElement("input", { ...props.attributes, key: isEditing() && props.defaultValue ? props.defaultValue : "default-key", placeholder: props.placeholder, type: props.type, name: props.name, value: props.value, defaultValue: props.defaultValue, required: props.required }));
});
export default FormInputComponent;
