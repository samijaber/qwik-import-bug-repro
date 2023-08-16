import { component$ } from "@builder.io/qwik";
import { hello, EnableEditor } from "@builder.io/sdk-qwik";

export default component$(() => {
  return (
    <>
      <EnableEditor />
      {hello}
    </>
  );
});
