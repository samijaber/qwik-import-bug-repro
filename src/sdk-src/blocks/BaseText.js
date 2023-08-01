import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import BuilderContext from "../context/builder.context";
import { component$, useContext } from "@builder.io/qwik";
export const BaseText = component$((props) => {
    const builderContext = useContext(BuilderContext);
    return (_jsx("span", { style: builderContext.inheritedStyles, children: props.text }));
});
export default BaseText;
