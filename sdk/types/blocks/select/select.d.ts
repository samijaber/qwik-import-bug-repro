/**
 * This import is used by the Svelte SDK. Do not remove.
 */ export interface FormSelectProps {
    options?: {
        name?: string;
        value: string;
    }[];
    attributes?: any;
    name?: string;
    value?: string;
    defaultValue?: string;
}
export declare const SelectComponent: import("@builder.io/qwik").Component<FormSelectProps>;
export default SelectComponent;
