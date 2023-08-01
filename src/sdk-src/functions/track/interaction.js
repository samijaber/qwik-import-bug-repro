function round(num) {
    return Math.round(num * 1000) / 1000;
}
const findParentElement = (target, callback, checkElement = true) => {
    if (!(target instanceof HTMLElement)) {
        return null;
    }
    let parent = checkElement ? target : target.parentElement;
    do {
        if (!parent) {
            return null;
        }
        const matches = callback(parent);
        if (matches) {
            return parent;
        }
    } while (parent = parent.parentElement);
    return null;
};
const findBuilderParent = (target) => findParentElement(target, el => {
    const id = el.getAttribute('builder-id') || el.id;
    return Boolean(id?.indexOf('builder-') === 0);
});
const computeOffset = ({ event, target }) => {
    const targetRect = target.getBoundingClientRect();
    const xOffset = event.clientX - targetRect.left;
    const yOffset = event.clientY - targetRect.top;
    const xRatio = round(xOffset / targetRect.width);
    const yRatio = round(yOffset / targetRect.height);
    return {
        x: xRatio,
        y: yRatio
    };
};
export const getInteractionPropertiesForEvent = (event) => {
    const target = event.target;
    const targetBuilderElement = target && findBuilderParent(target);
    const builderId = targetBuilderElement?.getAttribute('builder-id') || targetBuilderElement?.id;
    return {
        targetBuilderElement: builderId || undefined,
        metadata: {
            targetOffset: target ? computeOffset({
                event,
                target
            }) : undefined,
            builderTargetOffset: targetBuilderElement ? computeOffset({
                event,
                target: targetBuilderElement
            }) : undefined,
            builderElementIndex: targetBuilderElement && builderId ? [].slice.call(document.getElementsByClassName(builderId)).indexOf(targetBuilderElement) : undefined
        }
    };
};
