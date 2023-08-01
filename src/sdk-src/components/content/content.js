import { jsx as _jsx, jsxs as _jsxs } from "@builder.io/qwik/jsx-runtime";
import { getDefaultRegisteredComponents } from "../../constants/builder-registered-components.js";
import { TARGET } from "../../constants/target.js";
import ComponentsContext from "../../context/components.context";
import { components, serializeComponentInfo, } from "../../functions/register-component.js";
import Blocks from "../blocks/blocks";
import { getRenderContentScriptString } from "../content-variants/helpers.js";
import InlinedScript from "../inlined-script";
import EnableEditor from "./components/enable-editor";
import ContentStyles from "./components/styles";
import { getContentInitialValue, getContextStateInitialValue, } from "./content.helpers.js";
import { component$, useContextProvider, useStore, } from "@builder.io/qwik";
export const contentSetState = function contentSetState(props, state, newRootState) {
    state.builderContextSignal.rootState = newRootState;
};
export const ContentComponent = component$((props) => {
    const state = useStore({
        builderContextSignal: {
            content: getContentInitialValue({
                content: props.content,
                data: props.data,
            }),
            localState: undefined,
            rootState: getContextStateInitialValue({
                content: props.content,
                data: props.data,
                locale: props.locale,
            }),
            rootSetState: undefined,
            context: props.context || {},
            apiKey: props.apiKey,
            apiVersion: props.apiVersion,
            componentInfos: [
                ...getDefaultRegisteredComponents(),
                // While this `components` object is deprecated, we must maintain support for it.
                // Since users are able to override our default components, we need to make sure that we do not break such
                // existing usage.
                // This is why we spread `components` after the default Builder.io components, but before the `props.customComponents`,
                // which is the new standard way of providing custom components, and must therefore take precedence.
                ...components,
                ...(props.customComponents || []),
            ].reduce((acc, { component: _, ...info }) => ({
                ...acc,
                [info.name]: serializeComponentInfo(info),
            }), {}),
            inheritedStyles: {},
        },
        registeredComponents: [
            ...getDefaultRegisteredComponents(),
            // While this `components` object is deprecated, we must maintain support for it.
            // Since users are able to override our default components, we need to make sure that we do not break such
            // existing usage.
            // This is why we spread `components` after the default Builder.io components, but before the `props.customComponents`,
            // which is the new standard way of providing custom components, and must therefore take precedence.
            ...components,
            ...(props.customComponents || []),
        ].reduce((acc, { component, ...info }) => ({
            ...acc,
            [info.name]: {
                component: component,
                ...serializeComponentInfo(info),
            },
        }), {}),
        scriptStr: getRenderContentScriptString({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
            variationId: props.content?.testVariationId,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
            contentId: props.content?.id,
        }),
    }, { deep: true });
    useContextProvider(ComponentsContext, useStore({ registeredComponents: state.registeredComponents }));
    return (_jsxs(EnableEditor, { content: props.content, model: props.model, context: props.context, apiKey: props.apiKey, canTrack: props.canTrack, locale: props.locale, includeRefs: props.includeRefs, enrich: props.enrich, classNameProp: props.classNameProp, showContent: props.showContent, builderContextSignal: state.builderContextSignal, children: [props.isSsrAbTest ? (_jsx(InlinedScript, { scriptStr: state.scriptStr })) : null, TARGET !== "reactNative" ? (_jsx(ContentStyles, { contentId: state.builderContextSignal.content?.id, cssCode: state.builderContextSignal.content?.data?.cssCode, customFonts: state.builderContextSignal.content?.data?.customFonts })) : null, _jsx(Blocks, { blocks: state.builderContextSignal.content?.data?.blocks, context: state.builderContextSignal, registeredComponents: state.registeredComponents })] }));
});
export default ContentComponent;