import { TARGET } from '../constants/target.js';
// TODO: babel compile to include certain code only if the target matches
export function ifTarget({ targets, doThing, elseThing }) {
    if (TARGET && targets.includes(TARGET)) {
        return doThing();
    }
    else {
        return elseThing?.();
    }
}
