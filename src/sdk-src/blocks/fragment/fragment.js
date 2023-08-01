import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { Slot, component$ } from "@builder.io/qwik";
export const FragmentComponent = component$((props) => {
    return (_jsx("span", { children: _jsx(Slot, {}) }));
});
export default FragmentComponent;
