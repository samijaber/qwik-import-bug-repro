"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
let add;
const isBrowser = typeof window !== "undefined";
if (!isBrowser)
  Promise.resolve().then(() => require("./add-79123082.cjs")).then((x) => {
    console.log("dynamic add.js loaded");
    add = x.add;
  });
const addAndMultiply = (a, b, c) => {
  if (!isBrowser)
    return add(a, b) * c;
  return a + b * c;
};
const Child = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const number = qwik.useSignal(0);
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(({ track }) => {
    const [number2, props2] = qwik.useLexicalScope();
    track(() => props2.number);
    number2.value = props2.number;
  }, "Child_component_useTask_gat5XMPrDQ8", [
    number,
    props
  ]));
  return /* @__PURE__ */ qwik._jsxQ("div", null, null, [
    /* @__PURE__ */ qwik._jsxQ("div", null, null, [
      "original: ",
      qwik._fnSignal((p0) => p0.number, [
        props
      ], "p0.number")
    ], 3, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, null, [
      "multiplied:",
      addAndMultiply(10, 3, 2)
    ], 1, null)
  ], 1, "WW_0");
}, "Child_component_UuBKH4Xhbn4"));
const SdkComponent = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const number = qwik.useSignal(props.n || 0);
  return /* @__PURE__ */ qwik._jsxQ("div", null, null, [
    /* @__PURE__ */ qwik._jsxQ("button", null, {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl(() => {
        const [number2] = qwik.useLexicalScope();
        number2.value++;
      }, "SdkComponent_component_div_button_onClick_arPJcziaNt0", [
        number
      ])
    }, "+1", 3, null),
    /* @__PURE__ */ qwik._jsxC(Child, {
      get number() {
        return number.value;
      },
      [qwik._IMMUTABLE]: {
        number: qwik._fnSignal((p0) => p0.value, [
          number
        ], "p0.value")
      }
    }, 3, "1l_0")
  ], 1, "1l_1");
}, "SdkComponent_component_CrIEyISXdFs"));
exports.MySdkComponent = SdkComponent;
