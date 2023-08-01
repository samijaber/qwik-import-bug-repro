import type { BuilderContextInterface } from '../../context/types.js';
import type { BuilderContent } from '../../types/builder-content.js';
export interface SymbolInfo {
    model?: string;
    entry?: string;
    data?: any;
    content?: BuilderContent;
    inline?: boolean;
    dynamic?: boolean;
}
export declare const fetchContent: ({ builderContextValue, symbol }: {
    symbol: SymbolInfo | undefined;
    builderContextValue: BuilderContextInterface;
}) => Promise<BuilderContent | null | undefined>;
