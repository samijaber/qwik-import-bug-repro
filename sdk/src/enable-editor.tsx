import { evaluate } from "./functions/evaluate";
import { Slot, component$, useVisibleTask$ } from "@builder.io/qwik";

export const evalExpression = function evalExpression(
  props,
  state,
  elementRef,
  expression: string
) {
  return expression.replace(/{{([^}]+)}}/g, (_match, group) =>
    evaluate({
      code: group,
      context: props.context || {},
      localState: undefined,
      rootState: props.builderContextSignal.rootState,
      rootSetState: props.builderContextSignal.rootSetState,
    })
  );
};
export const emitStateUpdate = function emitStateUpdate() {
  window.dispatchEvent(new CustomEvent("builder:component:stateChange"));
};

export const EnableEditor = component$(() => {
  useVisibleTask$(() => {
    emitStateUpdate();
  });

  return (
    <div>
      hey from SDK component:
      <Slot></Slot>
    </div>
  );
});

export default EnableEditor;
