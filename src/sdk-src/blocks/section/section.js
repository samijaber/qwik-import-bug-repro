import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { Slot, component$ } from "@builder.io/qwik";
export const SectionComponent = component$((props) => {
    return (_jsx("section", { ...props.attributes, style: {
            width: "100%",
            alignSelf: "stretch",
            flexGrow: 1,
            boxSizing: "border-box",
            maxWidth: props.maxWidth || 1200,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            marginLeft: "auto",
            marginRight: "auto",
        }, children: _jsx(Slot, {}) }));
});
export default SectionComponent;
