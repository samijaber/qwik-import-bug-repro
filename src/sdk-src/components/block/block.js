import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@builder.io/qwik/jsx-runtime";
import { getBlockComponentOptions } from "../../functions/get-block-component-options.js";
import { getProcessedBlock } from "../../functions/get-processed-block.js";
import { getComponent, getRepeatItemData, isEmptyHtmlElement, } from "./block.helpers.js";
import BlockStyles from "./components/block-styles";
import BlockWrapper from "./components/block-wrapper";
import ComponentRef from "./components/component-ref/component-ref";
import RepeatedBlock from "./components/repeated-block";
import { component$, useComputed$, useStore, } from "@builder.io/qwik";
export const Block = component$((props) => {
    const state = useStore({ childrenContext: props.context });
    const blockComponent = useComputed$(() => {
        return getComponent({
            block: props.block,
            context: props.context,
            registeredComponents: props.registeredComponents,
        });
    });
    const repeatItem = useComputed$(() => {
        return getRepeatItemData({
            block: props.block,
            context: props.context,
        });
    });
    const processedBlock = useComputed$(() => {
        return repeatItem.value
            ? props.block
            : getProcessedBlock({
                block: props.block,
                localState: props.context.localState,
                rootState: props.context.rootState,
                rootSetState: props.context.rootSetState,
                context: props.context.context,
                shouldEvaluateBindings: true,
            });
    });
    const Tag = useComputed$(() => {
        return props.block.tagName || "div";
    });
    const canShowBlock = useComputed$(() => {
        if ("hide" in processedBlock.value) {
            return !processedBlock.value.hide;
        }
        if ("show" in processedBlock.value) {
            return processedBlock.value.show;
        }
        return true;
    });
    const childrenWithoutParentComponent = useComputed$(() => {
        /**
         * When there is no `componentRef`, there might still be children that need to be rendered. In this case,
         * we render them outside of `componentRef`.
         * NOTE: We make sure not to render this if `repeatItemData` is non-null, because that means we are rendering an array of
         * blocks, and the children will be repeated within those blocks.
         */
        const shouldRenderChildrenOutsideRef = !blockComponent.value?.component && !repeatItem.value;
        return shouldRenderChildrenOutsideRef
            ? processedBlock.value.children ?? []
            : [];
    });
    const componentRefProps = useComputed$(() => {
        return {
            blockChildren: processedBlock.value.children ?? [],
            componentRef: blockComponent.value?.component,
            componentOptions: {
                ...getBlockComponentOptions(processedBlock.value),
                builderContext: props.context,
                ...(blockComponent.value?.name === "Symbol" ||
                    blockComponent.value?.name === "Columns"
                    ? {
                        builderComponents: props.registeredComponents,
                    }
                    : {}),
            },
            context: state.childrenContext,
            registeredComponents: props.registeredComponents,
            builderBlock: processedBlock.value,
            includeBlockProps: blockComponent.value?.noWrap === true,
            isInteractive: !blockComponent.value?.isRSC,
        };
    });
    return (_jsx(_Fragment, { children: canShowBlock.value ? (!blockComponent.value?.noWrap ? (_jsxs(_Fragment, { children: [isEmptyHtmlElement(Tag.value) ? (_jsx(BlockWrapper, { Wrapper: Tag.value, block: processedBlock.value, context: props.context, hasChildren: false })) : null, !isEmptyHtmlElement(Tag.value) && repeatItem.value
                    ? (repeatItem.value || []).map(function (data, index) {
                        return (_jsx(RepeatedBlock, { repeatContext: data.context, block: data.block, registeredComponents: props.registeredComponents }, index));
                    })
                    : null, !isEmptyHtmlElement(Tag.value) && !repeatItem.value ? (_jsxs(BlockWrapper, { Wrapper: Tag.value, block: processedBlock.value, context: props.context, hasChildren: true, children: [_jsx(ComponentRef, { ...componentRefProps.value }), (childrenWithoutParentComponent.value || []).map(function (child) {
                            return (_jsx(Block, { block: child, context: state.childrenContext, registeredComponents: props.registeredComponents }, "block-" + child.id));
                        }), (childrenWithoutParentComponent.value || []).map(function (child) {
                            return (_jsx(BlockStyles, { block: child, context: state.childrenContext }, "block-style-" + child.id));
                        })] })) : null] })) : (_jsx(ComponentRef, { ...componentRefProps.value }))) : null }));
});
export default Block;
