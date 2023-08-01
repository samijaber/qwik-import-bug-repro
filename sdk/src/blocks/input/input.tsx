import { isEditing } from "../../functions/is-editing.js";

import { filterAttrs, setAttrs } from "../helpers.js";

import { Fragment, component$, h } from "@builder.io/qwik";

/**
 * This import is used by the Svelte SDK. Do not remove.
 */ // eslint-disable-next-line unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars
export interface FormInputProps {
  type?: string;
  attributes?: any;
  name?: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}
export const FormInputComponent = component$((props: FormInputProps) => {
  return (
    <input
      {...{}}
      {...props.attributes}
      key={
        isEditing() && props.defaultValue ? props.defaultValue : "default-key"
      }
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
      required={props.required}
    />
  );
});

export default FormInputComponent;