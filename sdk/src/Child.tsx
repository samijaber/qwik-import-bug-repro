import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { addAndMultiply } from "./add-and-multiply";

export default component$((props: { number: number }) => {
  const number = useSignal(0);
  useTask$(({ track }) => {
    track(() => props.number);
    number.value = props.number;
  });
  return (
    <div>
      <div>original: {props.number}</div>
      <div>multiplied:{addAndMultiply(10, 3, 2)}</div>
    </div>
  );
});
