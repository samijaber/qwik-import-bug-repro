import { Slot, component$, useVisibleTask$ } from "@builder.io/qwik";

export const evalExpression = function evalExpression() {
  return console.log("hey");
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
