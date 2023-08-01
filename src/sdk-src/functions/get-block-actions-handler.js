import { evaluate } from './evaluate';
import { $ } from '@builder.io/qwik';
export function createEventHandler(value, options) {
    return $((event) => evaluate({
        code: value,
        context: options.context,
        localState: options.localState,
        rootState: options.rootState,
        rootSetState: options.rootSetState,
        event,
    }));
}
