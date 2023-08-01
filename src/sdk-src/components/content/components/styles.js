import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import InlinedStyles from "../../inlined-styles";
import { getCss, getFontCss } from "./styles.helpers.js";
import { component$, useStore } from "@builder.io/qwik";
export const ContentStyles = component$((props) => {
    const state = useStore({
        injectedStyles: `
${getCss({
            cssCode: props.cssCode,
            contentId: props.contentId,
        })}
${getFontCss({
            customFonts: props.customFonts,
        })}

.builder-text > p:first-of-type, .builder-text > .builder-paragraph:first-of-type {
  margin: 0;
}
.builder-text > p, .builder-text > .builder-paragraph {
  color: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
  font-size: inherit;
  text-align: inherit;
  font-family: inherit;
}
`.trim(),
    });
    return _jsx(InlinedStyles, { styles: state.injectedStyles });
});
export default ContentStyles;
