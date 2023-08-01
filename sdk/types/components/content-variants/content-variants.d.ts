import { ContentVariantsProps } from "./content-variants.types.js";
type VariantsProviderProps = ContentVariantsProps & {
    /**
     * For internal use only. Do not provide this prop.
     */
    __isNestedRender?: boolean;
};
export declare const ContentVariants: import("@builder.io/qwik").Component<VariantsProviderProps>;
export default ContentVariants;
