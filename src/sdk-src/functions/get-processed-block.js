import { evaluate } from './evaluate';
import { fastClone } from './fast-clone.js';
import { set } from './set.js';
import { transformBlock } from './transform-block.js';
const evaluateBindings = ({ block, context, localState, rootState, rootSetState }) => {
    if (!block.bindings) {
        return block;
    }
    const copy = fastClone(block);
    const copied = {
        ...copy,
        properties: {
            ...copy.properties
        },
        actions: {
            ...copy.actions
        }
    };
    for (const binding in block.bindings) {
        const expression = block.bindings[binding];
        const value = evaluate({
            code: expression,
            localState,
            rootState,
            rootSetState,
            context
        });
        set(copied, binding, value);
    }
    return copied;
};
export function getProcessedBlock({ block, context, shouldEvaluateBindings, localState, rootState, rootSetState }) {
    const transformedBlock = transformBlock(block);
    if (shouldEvaluateBindings) {
        return evaluateBindings({
            block: transformedBlock,
            localState,
            rootState,
            rootSetState,
            context
        });
    }
    else {
        return transformedBlock;
    }
}
