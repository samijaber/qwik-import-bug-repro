import { BuilderContextInterface } from "../../../context/types.js";

import { getBlockActions } from "../../../functions/get-block-actions.js";

import { getBlockProperties } from "../../../functions/get-block-properties.js";

import { BuilderBlock } from "../../../types/builder-block.js";

import { PropsWithChildren } from "../../../types/typescript.js";

import { Fragment, Slot, component$, h } from "@builder.io/qwik";

export type InteractiveElementProps = {
  Wrapper: any;
  block: BuilderBlock;
  context: BuilderContextInterface;
  wrapperProps: object;
};
export const InteractiveElement = component$(
  (props: PropsWithChildren<InteractiveElementProps>) => {
    return (
      <props.Wrapper
        {...props.wrapperProps}
        attributes={{
          ...getBlockProperties({
            block: props.block,
            context: props.context,
          }),
          ...getBlockActions({
            block: props.block,
            rootState: props.context.rootState,
            rootSetState: props.context.rootSetState,
            localState: props.context.localState,
            context: props.context.context,
          }),
        }}
      >
        <Slot></Slot>
      </props.Wrapper>
    );
  }
);

export default InteractiveElement;
