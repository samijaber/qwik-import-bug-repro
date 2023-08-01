let add: (a: number, b: number) => number;

const isBrowser = typeof window !== "undefined";

if (!isBrowser) {
  import("./imported-helper.js").then((x) => {
    console.log("imported-helper.js loaded");

    add = x.add;
  });
}
export const addAndMultiply = (a: number, b: number, c: number) => {
  if (!isBrowser) {
    return add(a, b) * c;
  }
  return a + b * c;
};
