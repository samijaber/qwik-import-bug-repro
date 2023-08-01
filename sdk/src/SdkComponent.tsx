import { component$, useSignal } from "@builder.io/qwik";
import Child from "./Child";

export default component$((props: { n: number }) => {
  const number = useSignal(props.n || 0);
  return (
    <div>
      <button
        onClick$={() => {
          number.value++;
        }}
      >
        +1
      </button>
      <Child number={number.value} />
    </div>
  );
});
