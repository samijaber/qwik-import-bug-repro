import { componentQrl, inlinedQrl, useSignal, useTaskQrl, useLexicalScope, _jsxQ, _fnSignal, _jsxC, _IMMUTABLE } from "@builder.io/qwik";
let add;
const isBrowser = typeof window !== "undefined";
if (!isBrowser)
  import("./add-3db73051.js").then((x) => {
    console.log("dynamic add.js loaded");
    add = x.add;
  });
const addAndMultiply = (a, b, c) => {
  if (!isBrowser)
    return add(a, b) * c;
  return a + b * c;
};
const Child = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const number = useSignal(0);
  useTaskQrl(/* @__PURE__ */ inlinedQrl(({ track }) => {
    const [number2, props2] = useLexicalScope();
    track(() => props2.number);
    number2.value = props2.number;
  }, "Child_component_useTask_gat5XMPrDQ8", [
    number,
    props
  ]));
  return /* @__PURE__ */ _jsxQ("div", null, null, [
    /* @__PURE__ */ _jsxQ("div", null, null, [
      "original: ",
      _fnSignal((p0) => p0.number, [
        props
      ], "p0.number")
    ], 3, null),
    /* @__PURE__ */ _jsxQ("div", null, null, [
      "multiplied:",
      addAndMultiply(10, 3, 2)
    ], 1, null)
  ], 1, "WW_0");
}, "Child_component_UuBKH4Xhbn4"));
const SdkComponent = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const number = useSignal(props.n || 0);
  return /* @__PURE__ */ _jsxQ("div", null, null, [
    /* @__PURE__ */ _jsxQ("button", null, {
      onClick$: /* @__PURE__ */ inlinedQrl(() => {
        const [number2] = useLexicalScope();
        number2.value++;
      }, "SdkComponent_component_div_button_onClick_arPJcziaNt0", [
        number
      ])
    }, "+1", 3, null),
    /* @__PURE__ */ _jsxC(Child, {
      get number() {
        return number.value;
      },
      [_IMMUTABLE]: {
        number: _fnSignal((p0) => p0.value, [
          number
        ], "p0.value")
      }
    }, 3, "1l_0")
  ], 1, "1l_1");
}, "SdkComponent_component_CrIEyISXdFs"));
export {
  SdkComponent as MySdkComponent
};
