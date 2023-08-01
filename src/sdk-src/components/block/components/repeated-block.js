import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import BuilderContext from "../../../context/builder.context";
import Block from "../block";
import { component$, useContextProvider, useStore, } from "@builder.io/qwik";
export const RepeatedBlock = component$((props) => {
    const state = useStore({ store: props.repeatContext });
    useContextProvider(BuilderContext, state.store);
    return (_jsx(Block, { block: props.block, context: state.store, registeredComponents: props.registeredComponents }));
});
export default RepeatedBlock;
