import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { createElement as _createElement } from "@builder.io/qwik";
import { isEditing } from "../../functions/is-editing.js";
import { component$ } from "@builder.io/qwik";
export const SelectComponent = component$((props) => {
    return (_createElement("select", { ...props.attributes, value: props.value, key: isEditing() && props.defaultValue ? props.defaultValue : "default-key", defaultValue: props.defaultValue, name: props.name }, (props.options || []).map(function (option) {
        return (_jsx("option", { value: option.value, children: option.name || option.value }));
    })));
});
export default SelectComponent;
