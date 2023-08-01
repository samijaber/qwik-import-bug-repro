type Target = import('../types/targets').Target;
export declare function ifTarget<A, B>({ targets, doThing, elseThing }: {
    targets: Target[];
    doThing: () => A;
    elseThing?: () => B;
}): A | B | undefined;
export {};
