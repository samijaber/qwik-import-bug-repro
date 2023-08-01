import type { RegisteredComponent } from '../context/types.js';
import type { ComponentInfo } from '../types/components.js';
/**
 * @deprecated.  Use the `customComponents` prop in RenderContent instead to provide your custom components to the builder SDK.
 */
export declare const components: RegisteredComponent[];
/**
 * @deprecated.  Use the `customComponents` prop in RenderContent instead to provide your custom components to the builder SDK.
 */
export declare function registerComponent(component: any, info: ComponentInfo): void;
export declare const createRegisterComponentMessage: (info: ComponentInfo) => {
    type: string;
    data: ComponentInfo;
};
export declare const serializeComponentInfo: ({ inputs, ...info }: ComponentInfo) => ComponentInfo;
