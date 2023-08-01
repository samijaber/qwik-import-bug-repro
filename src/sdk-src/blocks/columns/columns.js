import { jsx as _jsx, jsxs as _jsxs } from "@builder.io/qwik/jsx-runtime";
import Blocks from "../../components/blocks/blocks";
import InlinedStyles from "../../components/inlined-styles";
import { getSizesForBreakpoints, } from "../../constants/device-sizes.js";
import { TARGET } from "../../constants/target.js";
import { component$, useComputed$, useStore, useStylesScoped$, } from "@builder.io/qwik";
export const getWidth = function getWidth(props, state, index) {
    return state.cols[index]?.width || 100 / state.cols.length;
};
export const getColumnCssWidth = function getColumnCssWidth(props, state, index) {
    const subtractWidth = (state.gutterSize * (state.cols.length - 1)) / state.cols.length;
    return `calc(${getWidth(props, state, index)}% - ${subtractWidth}px)`;
};
export const getTabletStyle = function getTabletStyle(props, state, { stackedStyle, desktopStyle, }) {
    return state.stackAt === "tablet" ? stackedStyle : desktopStyle;
};
export const getMobileStyle = function getMobileStyle(props, state, { stackedStyle, desktopStyle, }) {
    return state.stackAt === "never" ? desktopStyle : stackedStyle;
};
export const columnCssVars = function columnCssVars(props, state, index) {
    const gutter = index === 0 ? 0 : state.gutterSize;
    if (TARGET === "reactNative") {
        return {
            marginLeft: props.stackColumnsAt === "never" ? gutter : 0,
        };
    }
    const width = getColumnCssWidth(props, state, index);
    const gutterPixels = `${gutter}px`;
    const mobileWidth = "100%";
    const mobileMarginLeft = 0;
    const marginLeftKey = "margin-left";
    return {
        width,
        [marginLeftKey]: gutterPixels,
        "--column-width-mobile": getMobileStyle(props, state, {
            stackedStyle: mobileWidth,
            desktopStyle: width,
        }),
        "--column-margin-left-mobile": getMobileStyle(props, state, {
            stackedStyle: mobileMarginLeft,
            desktopStyle: gutterPixels,
        }),
        "--column-width-tablet": getTabletStyle(props, state, {
            stackedStyle: mobileWidth,
            desktopStyle: width,
        }),
        "--column-margin-left-tablet": getTabletStyle(props, state, {
            stackedStyle: mobileMarginLeft,
            desktopStyle: gutterPixels,
        }),
    };
};
export const getWidthForBreakpointSize = function getWidthForBreakpointSize(props, state, size) {
    const breakpointSizes = getSizesForBreakpoints(props.builderContext.content?.meta?.breakpoints || {});
    return breakpointSizes[size].max;
};
export const Columns = component$((props) => {
    const state = useStore({
        cols: props.columns || [],
        flexDir: props.stackColumnsAt === "never"
            ? "row"
            : props.reverseColumnsWhenStacked
                ? "column-reverse"
                : "column",
        gutterSize: typeof props.space === "number" ? props.space || 0 : 20,
        stackAt: props.stackColumnsAt || "tablet",
    });
    useStylesScoped$(STYLES);
    const columnsCssVars = useComputed$(() => {
        return {
            "--flex-dir": state.flexDir,
            "--flex-dir-tablet": getTabletStyle(props, state, {
                stackedStyle: state.flexDir,
                desktopStyle: "row",
            }),
        };
    });
    const columnsStyles = useComputed$(() => {
        return `
        @media (max-width: ${getWidthForBreakpointSize(props, state, "medium")}px) {
          .${props.builderBlock.id}-breakpoints {
            flex-direction: var(--flex-dir-tablet);
            align-items: stretch;
          }

          .${props.builderBlock.id}-breakpoints > .builder-column {
            width: var(--column-width-tablet) !important;
            margin-left: var(--column-margin-left-tablet) !important;
          }
        }

        @media (max-width: ${getWidthForBreakpointSize(props, state, "small")}px) {
          .${props.builderBlock.id}-breakpoints {
            flex-direction: var(--flex-dir);
            align-items: stretch;
          }

          .${props.builderBlock.id}-breakpoints > .builder-column {
            width: var(--column-width-mobile) !important;
            margin-left: var(--column-margin-left-mobile) !important;
          }
        },
      `;
    });
    return (_jsxs("div", { class: `builder-columns ${props.builderBlock.id}-breakpoints` +
            " div-Columns", style: columnsCssVars.value, children: [TARGET !== "reactNative" ? (_jsx(InlinedStyles, { styles: columnsStyles.value })) : null, (props.columns || []).map(function (column, index) {
                return (_jsx("div", { class: "builder-column div-Columns-2", style: columnCssVars(props, state, index), children: _jsx(Blocks, { blocks: column.blocks, path: `component.options.columns.${index}.blocks`, parent: props.builderBlock.id, styleProp: {
                            flexGrow: "1",
                        }, context: props.builderContext, registeredComponents: props.builderComponents }) }, index));
            })] }));
});
export default Columns;
export const STYLES = `
.div-Columns {
  display: flex;
  line-height: normal;
}
.div-Columns-2 {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
`;
