import { jsxs as _jsxs, jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { component$ } from "@builder.io/qwik";
import { addAndMultiply } from "./add-and-multiply";
export default component$(() => {
    return (_jsx("div", { children: _jsxs("div", { children: ["add and multiply: ", addAndMultiply(10, 3, 2)] }) }));
});
