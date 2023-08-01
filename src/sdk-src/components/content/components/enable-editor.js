import { jsx as _jsx, Fragment as _Fragment } from "@builder.io/qwik/jsx-runtime";
import builderContext from "../../../context/builder.context";
import { evaluate } from "../../../functions/evaluate";
import { getContent } from "../../../functions/get-content/index.js";
import { fetch } from "../../../functions/get-fetch.js";
import { isBrowser } from "../../../functions/is-browser.js";
import { isEditing } from "../../../functions/is-editing.js";
import { isPreviewing } from "../../../functions/is-previewing.js";
import { createRegisterComponentMessage } from "../../../functions/register-component.js";
import { track } from "../../../functions/track/index.js";
import { getInteractionPropertiesForEvent } from "../../../functions/track/interaction.js";
import { logger } from "../../../helpers/logger.js";
import { checkIsDefined } from "../../../helpers/nullable.js";
import { registerInsertMenu, setupBrowserForEditing, } from "../../../scripts/init-editing.js";
import { Slot, component$, useContextProvider, useSignal, useStore, useTask$, useVisibleTask$, } from "@builder.io/qwik";
export const mergeNewContent = function mergeNewContent(props, state, elementRef, newContent) {
    const newContentValue = {
        ...props.builderContextSignal.content,
        ...newContent,
        data: {
            ...props.builderContextSignal.content?.data,
            ...newContent?.data,
        },
        meta: {
            ...props.builderContextSignal.content?.meta,
            ...newContent?.meta,
            breakpoints: newContent?.meta?.breakpoints ||
                props.builderContextSignal.content?.meta?.breakpoints,
        },
    };
    props.builderContextSignal.content = newContentValue;
};
export const processMessage = function processMessage(props, state, elementRef, event) {
    const { data } = event;
    if (data) {
        switch (data.type) {
            case "builder.configureSdk": {
                const messageContent = data.data;
                const { breakpoints, contentId } = messageContent;
                if (!contentId ||
                    contentId !== props.builderContextSignal.content?.id) {
                    return;
                }
                if (breakpoints) {
                    mergeNewContent(props, state, elementRef, {
                        meta: {
                            breakpoints,
                        },
                    });
                }
                state.forceReRenderCount = state.forceReRenderCount + 1; // This is a hack to force Qwik to re-render.
                break;
            }
            case "builder.contentUpdate": {
                const messageContent = data.data;
                const key = messageContent.key ||
                    messageContent.alias ||
                    messageContent.entry ||
                    messageContent.modelName;
                const contentData = messageContent.data;
                if (key === props.model) {
                    mergeNewContent(props, state, elementRef, contentData);
                    state.forceReRenderCount = state.forceReRenderCount + 1; // This is a hack to force Qwik to re-render.
                }
                break;
            }
        }
    }
};
export const evaluateJsCode = function evaluateJsCode(props, state, elementRef) {
    // run any dynamic JS code attached to content
    const jsCode = props.builderContextSignal.content?.data?.jsCode;
    if (jsCode) {
        evaluate({
            code: jsCode,
            context: props.context || {},
            localState: undefined,
            rootState: props.builderContextSignal.rootState,
            rootSetState: props.builderContextSignal.rootSetState,
        });
    }
};
export const onClick = function onClick(props, state, elementRef, event) {
    if (props.builderContextSignal.content) {
        const variationId = props.builderContextSignal.content?.testVariationId;
        const contentId = props.builderContextSignal.content?.id;
        track({
            type: "click",
            canTrack: state.canTrackToUse,
            contentId,
            apiKey: props.apiKey,
            variationId: variationId !== contentId ? variationId : undefined,
            ...getInteractionPropertiesForEvent(event),
            unique: !state.clicked,
        });
    }
    if (!state.clicked) {
        state.clicked = true;
    }
};
export const evalExpression = function evalExpression(props, state, elementRef, expression) {
    return expression.replace(/{{([^}]+)}}/g, (_match, group) => evaluate({
        code: group,
        context: props.context || {},
        localState: undefined,
        rootState: props.builderContextSignal.rootState,
        rootSetState: props.builderContextSignal.rootSetState,
    }));
};
export const handleRequest = function handleRequest(props, state, elementRef, { url, key, }) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
        const newState = {
            ...props.builderContextSignal.rootState,
            [key]: json,
        };
        props.builderContextSignal.rootSetState?.(newState);
        state.httpReqsData[key] = true;
    })
        .catch((err) => {
        console.error("error fetching dynamic data", url, err);
    });
};
export const runHttpRequests = function runHttpRequests(props, state, elementRef) {
    const requests = props.builderContextSignal.content?.data?.httpRequests ?? {};
    Object.entries(requests).forEach(([key, url]) => {
        if (url && (!state.httpReqsData[key] || isEditing())) {
            const evaluatedUrl = evalExpression(props, state, elementRef, url);
            handleRequest(props, state, elementRef, {
                url: evaluatedUrl,
                key,
            });
        }
    });
};
export const emitStateUpdate = function emitStateUpdate(props, state, elementRef) {
    if (isEditing()) {
        window.dispatchEvent(new CustomEvent("builder:component:stateChange", {
            detail: {
                state: props.builderContextSignal.rootState,
                ref: {
                    name: props.model,
                },
            },
        }));
    }
};
export const EnableEditor = component$((props) => {
    const elementRef = useSignal();
    const state = useStore({
        canTrackToUse: checkIsDefined(props.canTrack) ? props.canTrack : true,
        clicked: false,
        forceReRenderCount: 0,
        httpReqsData: {},
        lastUpdated: 0,
        shouldSendResetCookie: false,
    }, { deep: true });
    useContextProvider(builderContext, props.builderContextSignal);
    useVisibleTask$(() => {
        if (!props.apiKey) {
            logger.error("No API key provided to `RenderContent` component. This can cause issues. Please provide an API key using the `apiKey` prop.");
        }
        if (isBrowser()) {
            if (isEditing()) {
                state.forceReRenderCount = state.forceReRenderCount + 1;
                window.addEventListener("message", processMessage.bind(null, props, state, elementRef));
                registerInsertMenu();
                setupBrowserForEditing({
                    ...(props.locale
                        ? {
                            locale: props.locale,
                        }
                        : {}),
                    ...(props.includeRefs
                        ? {
                            includeRefs: props.includeRefs,
                        }
                        : {}),
                    ...(props.enrich
                        ? {
                            enrich: props.enrich,
                        }
                        : {}),
                });
                Object.values(props.builderContextSignal.componentInfos).forEach((registeredComponent) => {
                    const message = createRegisterComponentMessage(registeredComponent);
                    window.parent?.postMessage(message, "*");
                });
                window.addEventListener("builder:component:stateChangeListenerActivated", emitStateUpdate.bind(null, props, state, elementRef));
            }
            if (props.builderContextSignal.content) {
                const variationId = props.builderContextSignal.content?.testVariationId;
                const contentId = props.builderContextSignal.content?.id;
                track({
                    type: "impression",
                    canTrack: state.canTrackToUse,
                    contentId,
                    apiKey: props.apiKey,
                    variationId: variationId !== contentId ? variationId : undefined,
                });
            }
            // override normal content in preview mode
            if (isPreviewing()) {
                const searchParams = new URL(location.href).searchParams;
                const searchParamPreviewModel = searchParams.get("builder.preview");
                const searchParamPreviewId = searchParams.get(`builder.preview.${searchParamPreviewModel}`);
                const previewApiKey = searchParams.get("apiKey") || searchParams.get("builder.space");
                /**
                 * Make sure that:
                 * - the preview model name is the same as the one we're rendering, since there can be multiple models rendered
                 *  at the same time, e.g. header/page/footer.
                 * - the API key is the same, since we don't want to preview content from other organizations.
                 * - if there is content, that the preview ID is the same as that of the one we receive.
                 *
                 * TO-DO: should we only update the state when there is a change?
                 **/
                if (searchParamPreviewModel === props.model &&
                    previewApiKey === props.apiKey &&
                    (!props.content || searchParamPreviewId === props.content.id)) {
                    getContent({
                        model: props.model,
                        apiKey: props.apiKey,
                        apiVersion: props.builderContextSignal.apiVersion,
                    }).then((content) => {
                        if (content) {
                            mergeNewContent(props, state, elementRef, content);
                        }
                    });
                }
            }
            evaluateJsCode(props, state, elementRef);
            runHttpRequests(props, state, elementRef);
            emitStateUpdate(props, state, elementRef);
        }
    });
    useTask$(({ track }) => {
        track(() => props.content);
        if (props.content) {
            mergeNewContent(props, state, elementRef, props.content);
        }
    });
    useTask$(({ track }) => {
        track(() => state.shouldSendResetCookie);
    });
    useTask$(({ track }) => {
        track(() => props.builderContextSignal.content?.data?.jsCode);
        track(() => props.builderContextSignal.rootState);
        evaluateJsCode(props, state, elementRef);
    });
    useTask$(({ track }) => {
        track(() => props.builderContextSignal.content?.data?.httpRequests);
        runHttpRequests(props, state, elementRef);
    });
    useTask$(({ track }) => {
        track(() => props.builderContextSignal.rootState);
        emitStateUpdate(props, state, elementRef);
    });
    return (_jsx(_Fragment, { children: props.builderContextSignal.content ? (_jsx("div", { ref: elementRef, "onClick$": (event) => onClick(props, state, elementRef, event), "builder-content-id": props.builderContextSignal.content?.id, "builder-model": props.model, ...(props.showContent
                ? {}
                : {
                    hidden: true,
                    "aria-hidden": true,
                }), class: props.classNameProp, children: _jsx(Slot, {}) }, state.forceReRenderCount)) : null }));
});
export default EnableEditor;
