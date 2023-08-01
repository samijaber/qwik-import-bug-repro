export interface CustomFont {
    family?: string;
    kind?: string;
    fileUrl?: string;
    files?: {
        [key: string]: string;
    };
}
export declare const getFontCss: ({ customFonts }: {
    customFonts?: CustomFont[] | undefined;
}) => string;
export declare const getCss: ({ cssCode, contentId }: {
    cssCode?: string | undefined;
    contentId?: string | undefined;
}) => string;
