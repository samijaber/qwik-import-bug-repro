import { jsx as _jsx, jsxs as _jsxs } from "@builder.io/qwik/jsx-runtime";
import BuilderContext from "../../context/builder.context";
import ComponentsContext from "../../context/components.context";
import Block from "../block/block";
import BlockStyles from "../block/components/block-styles";
import { default as BlocksWrapper } from "./blocks-wrapper";
import { component$, useContext } from "@builder.io/qwik";
export const Blocks = component$((props) => {
    const builderContext = useContext(BuilderContext);
    const componentsContext = useContext(ComponentsContext);
    return (_jsxs(BlocksWrapper, { blocks: props.blocks, parent: props.parent, path: props.path, styleProp: props.styleProp, children: [props.blocks
                ? (props.blocks || []).map(function (block) {
                    return (_jsx(Block, { block: block, context: props.context || builderContext, registeredComponents: props.registeredComponents ||
                            componentsContext.registeredComponents }, "render-block-" + block.id));
                })
                : null, props.blocks
                ? (props.blocks || []).map(function (block) {
                    return (_jsx(BlockStyles, { block: block, context: props.context || builderContext }, "block-style-" + block.id));
                })
                : null] }));
});
export default Blocks;
