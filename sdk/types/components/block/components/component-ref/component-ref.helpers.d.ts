import type { BuilderContextInterface, RegisteredComponents } from '../../../../context/types.js';
import type { BuilderBlock } from '../../../../types/builder-block.js';
import type { PropsWithBuilderData } from '../../../../types/builder-props.js';
import type { InteractiveElementProps } from '../interactive-element';
type ComponentOptions = PropsWithBuilderData<{
    [index: string]: any;
    attributes?: {
        [index: string]: any;
    };
}>;
export interface ComponentProps {
    componentRef: any;
    componentOptions: ComponentOptions;
    blockChildren: BuilderBlock[];
    context: BuilderContextInterface;
    registeredComponents: RegisteredComponents;
    builderBlock: BuilderBlock;
    includeBlockProps: boolean;
    isInteractive: boolean | undefined;
}
export declare const getWrapperProps: ({ componentOptions, builderBlock, context, componentRef, includeBlockProps, isInteractive, contextValue }: Omit<ComponentProps, "registeredComponents" | "blockChildren"> & {
    contextValue: BuilderContextInterface;
}) => InteractiveElementProps | {
    attributes?: {
        'builder-id': string | undefined;
        style: string | Partial<CSSStyleDeclaration> | undefined;
        class: string;
        href: any;
    } | {
        [index: string]: any;
    } | undefined;
    builderBlock: BuilderBlock;
    builderContext: BuilderContextInterface;
};
export {};
