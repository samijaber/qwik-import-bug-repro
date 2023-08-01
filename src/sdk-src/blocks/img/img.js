import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { isEditing } from "../../functions/is-editing.js";
import { component$ } from "@builder.io/qwik";
export const ImgComponent = component$((props) => {
    return (_jsx("img", { style: {
            objectFit: props.backgroundSize || "cover",
            objectPosition: props.backgroundPosition || "center",
        }, alt: props.altText, src: props.imgSrc || props.image, ...props.attributes }, (isEditing() && props.imgSrc) || "default-key"));
});
export default ImgComponent;
