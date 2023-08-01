let add;
const isBrowser = typeof window !== "undefined";
if (!isBrowser) {
    import("./add.js").then((x) => {
        console.log("dynamic add.js loaded");
        add = x.add;
    });
}
export const addAndMultiply = (a, b, c) => {
    if (!isBrowser) {
        return add(a, b) * c;
    }
    return a + b * c;
};
