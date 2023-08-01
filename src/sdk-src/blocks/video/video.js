import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { component$, useComputed$ } from "@builder.io/qwik";
export const Video = component$((props) => {
    const videoProps = useComputed$(() => {
        return {
            ...(props.autoPlay === true
                ? {
                    autoPlay: true,
                }
                : {}),
            ...(props.muted === true
                ? {
                    muted: true,
                }
                : {}),
            ...(props.controls === true
                ? {
                    controls: true,
                }
                : {}),
            ...(props.loop === true
                ? {
                    loop: true,
                }
                : {}),
            ...(props.playsInline === true
                ? {
                    playsInline: true,
                }
                : {}),
        };
    });
    const spreadProps = useComputed$(() => {
        return {
            ...props.attributes,
            ...videoProps.value,
        };
    });
    const state = {};
    return (_jsx("video", { ...spreadProps.value, preload: props.preload || "metadata", style: {
            width: "100%",
            height: "100%",
            ...props.attributes?.style,
            objectFit: props.fit,
            objectPosition: props.position,
            // Hack to get object fit to work as expected and
            // not have the video overflow
            borderRadius: 1,
        }, src: props.video || "no-src", poster: props.posterImage }));
});
export default Video;
