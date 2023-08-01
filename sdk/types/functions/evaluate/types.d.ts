export type ExecutorArgs = Pick<any, "localState" | "context" | "rootState" | "rootSetState"> & {
    useCode: string;
    builder: {
        isEditing: boolean | undefined;
        isBrowser: boolean | undefined;
        isServer: boolean | undefined;
    };
    event: Event | undefined;
};
