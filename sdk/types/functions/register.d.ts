import type { BuilderBlock } from '../types/builder-block.js';
import type { DeepPartial } from '../types/deep-partial.js';
export interface InsertMenuItem {
    name: string;
    icon?: string;
    item: DeepPartial<BuilderBlock>;
}
export interface InsertMenuConfig {
    name: string;
    priority?: number;
    persist?: boolean;
    advanced?: boolean;
    items: InsertMenuItem[];
}
export declare function register(type: 'insertMenu', info: InsertMenuConfig): void;
export declare function register(type: string, info: any): void;