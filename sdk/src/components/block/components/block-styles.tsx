import {
  getMaxWidthQueryForSize,
  getSizesForBreakpoints,
} from "../../../constants/device-sizes.js";

import { TARGET } from "../../../constants/target.js";

import { BuilderContextInterface } from "../../../context/types.js";

import { getProcessedBlock } from "../../../functions/get-processed-block.js";

import { createCssClass } from "../../../helpers/css.js";

import { checkIsDefined } from "../../../helpers/nullable.js";

import { BuilderBlock } from "../../../types/builder-block.js";

import InlinedStyles from "../../inlined-styles";

import {
  Fragment,
  component$,
  h,
  useComputed$,
  useStore,
} from "@builder.io/qwik";

export type BlockStylesProps = {
  block: BuilderBlock;
  context: BuilderContextInterface;
};
export const BlockStyles = component$((props: BlockStylesProps) => {
  const state = useStore<any>({
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
    const sizesWithUpdatedBreakpoints = getSizesForBreakpoints(
      content?.meta?.breakpoints || {}
    );
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
          mediaQuery: getMaxWidthQueryForSize(
            "medium",
            sizesWithUpdatedBreakpoints
          ),
        })
      : "";
    const smallStylesClass = smallStyles
      ? createCssClass({
          className,
          styles: smallStyles,
          mediaQuery: getMaxWidthQueryForSize(
            "small",
            sizesWithUpdatedBreakpoints
          ),
        })
      : "";
    return [largeStylesClass, mediumStylesClass, smallStylesClass].join(" ");
  });
  return (
    <>
      {TARGET !== "reactNative" && css.value && canShowBlock.value ? (
        <InlinedStyles styles={css.value}></InlinedStyles>
      ) : null}
    </>
  );
});

export default BlockStyles;