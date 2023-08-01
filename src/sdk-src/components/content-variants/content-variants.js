import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@builder.io/qwik/jsx-runtime";
import { TARGET } from "../../constants/target.js";
import { handleABTestingSync } from "../../helpers/ab-tests.js";
import { getDefaultCanTrack } from "../../helpers/canTrack.js";
import ContentComponent from "../content/content";
import InlinedScript from "../inlined-script";
import InlinedStyles from "../inlined-styles";
import { checkShouldRunVariants, getScriptString, getVariants, getVariantsScriptString, } from "./helpers.js";
import { Fragment, component$, useComputed$, useStore, useVisibleTask$, } from "@builder.io/qwik";
export const ContentVariants = component$((props) => {
    const variantScriptStr = useComputed$(() => {
        return getVariantsScriptString(getVariants(props.content).map((value) => ({
            id: value.testVariationId,
            testRatio: value.testRatio,
        })), props.content?.id || "");
    });
    const hideVariantsStyleString = useComputed$(() => {
        return getVariants(props.content)
            .map((value) => `.variant-${value.testVariationId} { display: none; } `)
            .join("");
    });
    const state = useStore({
        shouldRenderVariants: checkShouldRunVariants({
            canTrack: getDefaultCanTrack(props.canTrack),
            content: props.content,
        }),
    });
    useVisibleTask$(() => {
        /**
         * We unmount the non-winning variants post-hydration in Vue.
         */
    });
    return (_jsxs(Fragment, { children: [!props.__isNestedRender && TARGET !== "reactNative" ? (_jsx(InlinedScript, { scriptStr: getScriptString() })) : null, state.shouldRenderVariants ? (_jsxs(_Fragment, { children: [_jsx(InlinedStyles, { id: `variants-styles-${props.content?.id}`, styles: hideVariantsStyleString.value }), _jsx(InlinedScript, { scriptStr: variantScriptStr.value }), (getVariants(props.content) || []).map(function (variant) {
                        return (_jsx(ContentComponent, { content: variant, showContent: false, classNameProp: undefined, model: props.model, data: props.data, context: props.context, apiKey: props.apiKey, apiVersion: props.apiVersion, customComponents: props.customComponents, canTrack: props.canTrack, locale: props.locale, includeRefs: props.includeRefs, enrich: props.enrich, isSsrAbTest: state.shouldRenderVariants }, variant.testVariationId));
                    })] })) : null, _jsx(ContentComponent, { content: state.shouldRenderVariants
                    ? props.content
                    : handleABTestingSync({
                        item: props.content,
                        canTrack: getDefaultCanTrack(props.canTrack),
                    }), classNameProp: `variant-${props.content?.id}`, showContent: true, model: props.model, data: props.data, context: props.context, apiKey: props.apiKey, apiVersion: props.apiVersion, customComponents: props.customComponents, canTrack: props.canTrack, locale: props.locale, includeRefs: props.includeRefs, enrich: props.enrich, isSsrAbTest: state.shouldRenderVariants })] }));
});
export default ContentVariants;
