import type { Nullable } from '../../helpers/nullable.js';
import type { BuilderContent } from '../../types/builder-content.js';
export declare const getVariants: (content: Nullable<BuilderContent>) => {
    testVariationId: string | undefined;
    id: string | undefined;
    data?: {
        [key: string]: any;
        title?: string | undefined;
        blocks?: import("../../types/builder-block.js").BuilderBlock[] | undefined;
        inputs?: import("../../types/input.js").Input[] | undefined;
        state?: {
            [key: string]: any;
        } | undefined;
        jsCode?: string | undefined;
        tsCode?: string | undefined;
        httpRequests?: {
            [key: string]: string;
        } | undefined;
    } | undefined;
    name?: string | undefined;
    testRatio?: number | undefined;
    meta?: {
        [key: string]: any;
        breakpoints?: import("../../types/typescript.js").Nullable<import("../../types/builder-content.js").Breakpoints>;
    } | undefined;
}[];
export declare const checkShouldRunVariants: ({ canTrack, content }: {
    canTrack: Nullable<boolean>;
    content: Nullable<BuilderContent>;
}) => boolean;
type VariantData = {
    id: string;
    testRatio?: number;
};
export declare const getScriptString: () => string;
export declare const getVariantsScriptString: (variants: VariantData[], contentId: string) => string;
export declare const getRenderContentScriptString: ({ contentId, variationId }: {
    variationId: string;
    contentId: string;
}) => string;
export {};
