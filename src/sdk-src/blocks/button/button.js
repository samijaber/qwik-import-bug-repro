import { jsx as _jsx, Fragment as _Fragment } from "@builder.io/qwik/jsx-runtime";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
export const Button = component$((props) => {
    useStylesScoped$(STYLES);
    return (_jsx(_Fragment, { children: props.link ? (_jsx("a", { role: "button", ...props.attributes, href: props.link, target: props.openLinkInNewTab ? "_blank" : undefined, children: props.text })) : (_jsx("button", { ...props.attributes, style: props.attributes.style, class: props.attributes.class + " button-Button", children: props.text })) }));
});
export default Button;
export const STYLES = `
.button-Button {
  all: unset;
}
`;
