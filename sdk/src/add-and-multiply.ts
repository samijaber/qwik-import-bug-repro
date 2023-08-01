let add: (a: number, b: number) => number;

const isBrowser = typeof window !== "undefined";

if (!isBrowser) {
  import("./add.js").then((x) => {
    console.log("dynamic add.js loaded");

    add = x.add;
  });
}
export const addAndMultiply = (a: number, b: number, c: number) => {
  if (!isBrowser) {
    return add(a, b) * c;
  }
  return a + b * c;
};
