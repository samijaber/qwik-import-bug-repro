import { jsx as _jsx, jsxs as _jsxs } from "@builder.io/qwik/jsx-runtime";
import { getSrcSet } from "./image.helpers.js";
import { Fragment, Slot, component$, useComputed$, useStylesScoped$, } from "@builder.io/qwik";
export const Image = component$((props) => {
    useStylesScoped$(STYLES);
    const srcSetToUse = useComputed$(() => {
        const imageToUse = props.image || props.src;
        const url = imageToUse;
        if (!url ||
            // We can auto add srcset for cdn.builder.io and shopify
            // images, otherwise you can supply this prop manually
            !(url.match(/builder\.io/) || url.match(/cdn\.shopify\.com/))) {
            return props.srcset;
        }
        if (props.srcset && props.image?.includes("builder.io/api/v1/image")) {
            if (!props.srcset.includes(props.image.split("?")[0])) {
                console.debug("Removed given srcset");
                return getSrcSet(url);
            }
        }
        else if (props.image && !props.srcset) {
            return getSrcSet(url);
        }
        return getSrcSet(url);
    });
    const webpSrcSet = useComputed$(() => {
        if (srcSetToUse.value?.match(/builder\.io/) && !props.noWebp) {
            return srcSetToUse.value.replace(/\?/g, "?format=webp&");
        }
        else {
            return "";
        }
    });
    const aspectRatioCss = useComputed$(() => {
        const aspectRatioStyles = {
            position: "absolute",
            height: "100%",
            width: "100%",
            left: "0px",
            top: "0px",
        };
        const out = props.aspectRatio ? aspectRatioStyles : undefined;
        return out;
    });
    const state = {};
    return (_jsxs(Fragment, { children: [_jsxs("picture", { children: [webpSrcSet.value ? (_jsx("source", { type: "image/webp", srcSet: webpSrcSet.value })) : null, _jsx("img", { loading: "lazy", alt: props.altText, role: props.altText ? "presentation" : undefined, style: {
                            objectPosition: props.backgroundPosition || "center",
                            objectFit: props.backgroundSize || "cover",
                            ...aspectRatioCss.value,
                        }, class: "builder-image" +
                            (props.className ? " " + props.className : "") +
                            " img-Image", src: props.image, srcSet: srcSetToUse.value, sizes: props.sizes })] }), props.aspectRatio &&
                !(props.builderBlock?.children?.length && props.fitContent) ? (_jsx("div", { class: "builder-image-sizer div-Image", style: {
                    paddingTop: props.aspectRatio * 100 + "%",
                } })) : null, props.builderBlock?.children?.length && props.fitContent ? (_jsx(Slot, {})) : null, !props.fitContent && props.children ? (_jsx("div", { class: "div-Image-2", children: _jsx(Slot, {}) })) : null] }));
});
export default Image;
export const STYLES = `
.img-Image {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}
.div-Image {
  width: 100%;
  pointer-events: none;
  font-size: 0;
}
.div-Image-2 {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`;
