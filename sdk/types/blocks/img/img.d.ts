/**
 * This import is used by the Svelte SDK. Do not remove.
 */ export interface ImgProps {
    attributes?: any;
    imgSrc?: string;
    image?: string;
    altText?: string;
    backgroundSize?: "cover" | "contain";
    backgroundPosition?: "center" | "top" | "left" | "right" | "bottom" | "top left" | "top right" | "bottom left" | "bottom right";
}
export declare const ImgComponent: import("@builder.io/qwik").Component<ImgProps>;
export default ImgComponent;
