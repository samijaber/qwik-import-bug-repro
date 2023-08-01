import { jsx as _jsx, Fragment as _Fragment } from "@builder.io/qwik/jsx-runtime";
import { getMaxWidthQueryForSize, getSizesForBreakpoints, } from "../../../constants/device-sizes.js";
import { TARGET } from "../../../constants/target.js";
import { getProcessedBlock } from "../../../functions/get-processed-block.js";
import { createCssClass } from "../../../helpers/css.js";
import { checkIsDefined } from "../../../helpers/nullable.js";
import InlinedStyles from "../../inlined-styles";
import { component$, useComputed$, useStore, } from "@builder.io/qwik";
export const BlockStyles = component$((props) => {
    const state = useStore({
        processedBlock: getProcessedBlock({
            block: props.block,
            localState: props.context.localState,
            rootState: props.context.rootState,
            rootSetState: props.context.rootSetState,
            context: props.context.context,
            shouldEvaluateBindings: true,
        }),
    });
    const canShowBlock = useComputed$(() => {
        // only render styles for blocks that are visible
        if (checkIsDefined(state.processedBlock.hide)) {
            return !state.processedBlock.hide;
        }
        if (checkIsDefined(state.processedBlock.show)) {
            return state.processedBlock.show;
        }
        return true;
    });
    const css = useComputed$(() => {
        const styles = state.processedBlock.responsiveStyles;
        const content = props.context.content;
        const sizesWithUpdatedBreakpoints = getSizesForBreakpoints(content?.meta?.breakpoints || {});
        const largeStyles = styles?.large;
        const mediumStyles = styles?.medium;
        const smallStyles = styles?.small;
        const className = state.processedBlock.id;
        if (!className) {
            return "";
        }
        const largeStylesClass = largeStyles
            ? createCssClass({
                className,
                styles: largeStyles,
            })
            : "";
        const mediumStylesClass = mediumStyles
            ? createCssClass({
                className,
                styles: mediumStyles,
                mediaQuery: getMaxWidthQueryForSize("medium", sizesWithUpdatedBreakpoints),
            })
            : "";
        const smallStylesClass = smallStyles
            ? createCssClass({
                className,
                styles: smallStyles,
                mediaQuery: getMaxWidthQueryForSize("small", sizesWithUpdatedBreakpoints),
            })
            : "";
        return [largeStylesClass, mediumStylesClass, smallStylesClass].join(" ");
    });
    return (_jsx(_Fragment, { children: TARGET !== "reactNative" && css.value && canShowBlock.value ? (_jsx(InlinedStyles, { styles: css.value })) : null }));
});
export default BlockStyles;
