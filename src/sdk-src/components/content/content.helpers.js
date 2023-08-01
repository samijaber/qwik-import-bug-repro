export const getContextStateInitialValue = ({ content, data, locale }) => {
    const defaultValues = {};
    // set default values for content state inputs
    content?.data?.inputs?.forEach(input => {
        if (input.name && input.defaultValue !== undefined && content?.data?.state && content.data.state[input.name] === undefined) {
            defaultValues[input.name] = input.defaultValue;
        }
    });
    const stateToUse = {
        ...content?.data?.state,
        ...data,
        ...(locale ? {
            locale
        } : {})
    };
    return {
        ...defaultValues,
        ...stateToUse
    };
};
export const getContentInitialValue = ({ content, data }) => {
    return !content ? undefined : {
        ...content,
        data: {
            ...content?.data,
            ...data
        },
        meta: content?.meta
    };
};
