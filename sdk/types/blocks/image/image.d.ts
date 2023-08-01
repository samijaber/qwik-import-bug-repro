import { BuilderBlock } from "../../types/builder-block.js";
import { JSX } from "@builder.io/mitosis/jsx-runtime";
export interface ImageProps {
    className?: string;
    image: string;
    sizes?: string;
    lazy?: boolean;
    height?: number;
    width?: number;
    altText?: string;
    backgroundSize?: "cover" | "contain";
    backgroundPosition?: string;
    srcset?: string;
    aspectRatio?: number;
    children?: JSX.Element;
    fitContent?: boolean;
    builderBlock?: BuilderBlock;
    noWebp?: boolean;
    src?: string;
}
export declare const Image: import("@builder.io/qwik").Component<ImageProps>;
export default Image;
export declare const STYLES = "\n.img-Image {\n  opacity: 1;\n  transition: opacity 0.2s ease-in-out;\n}\n.div-Image {\n  width: 100%;\n  pointer-events: none;\n  font-size: 0;\n}\n.div-Image-2 {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n";
