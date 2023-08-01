import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import ContentVariants from "../../components/content-variants/content-variants";
import { fetchContent } from "./symbol.helpers.js";
import { component$, useComputed$, useStore, useTask$, useVisibleTask$, } from "@builder.io/qwik";
export const setContent = function setContent(props, state) {
    if (state.contentToUse)
        return;
    fetchContent({
        symbol: props.symbol,
        builderContextValue: props.builderContext,
    }).then((newContent) => {
        if (newContent) {
            state.contentToUse = newContent;
        }
    });
};
export const Symbol = component$((props) => {
    const className = useComputed$(() => {
        return [
            ...[props.attributes.class],
            "builder-symbol",
            props.symbol?.inline ? "builder-inline-symbol" : undefined,
            props.symbol?.dynamic || props.dynamic
                ? "builder-dynamic-symbol"
                : undefined,
        ]
            .filter(Boolean)
            .join(" ");
    });
    const state = useStore({ contentToUse: props.symbol?.content });
    useVisibleTask$(() => {
        setContent(props, state);
    });
    useTask$(({ track }) => {
        track(() => props.symbol);
        setContent(props, state);
    });
    return (_jsx("div", { ...props.attributes, class: className.value, children: _jsx(ContentVariants, { apiVersion: props.builderContext.apiVersion, apiKey: props.builderContext.apiKey, context: props.builderContext.context, customComponents: Object.values(props.builderComponents), data: {
                ...props.symbol?.data,
                ...props.builderContext.localState,
                ...state.contentToUse?.data?.state,
            }, model: props.symbol?.model, content: state.contentToUse }) }));
});
export default Symbol;
