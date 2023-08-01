import { TARGET } from "../../constants/target.js";

import { handleABTestingSync } from "../../helpers/ab-tests.js";

import { getDefaultCanTrack } from "../../helpers/canTrack.js";

import ContentComponent from "../content/content";

import InlinedScript from "../inlined-script";

import InlinedStyles from "../inlined-styles";

import { ContentVariantsProps } from "./content-variants.types.js";

import {
  checkShouldRunVariants,
  getScriptString,
  getVariants,
  getVariantsScriptString,
} from "./helpers.js";

import {
  Fragment,
  component$,
  h,
  useComputed$,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

type VariantsProviderProps = ContentVariantsProps & {
  /**
   * For internal use only. Do not provide this prop.
   */
  __isNestedRender?: boolean;
};
export const ContentVariants = component$((props: VariantsProviderProps) => {
  const variantScriptStr = useComputed$(() => {
    return getVariantsScriptString(
      getVariants(props.content).map((value) => ({
        id: value.testVariationId!,
        testRatio: value.testRatio,
      })),
      props.content?.id || ""
    );
  });
  const hideVariantsStyleString = useComputed$(() => {
    return getVariants(props.content)
      .map((value) => `.variant-${value.testVariationId} { display: none; } `)
      .join("");
  });
  const state = useStore<any>({
    shouldRenderVariants: checkShouldRunVariants({
      canTrack: getDefaultCanTrack(props.canTrack),
      content: props.content,
    }),
  });
  useVisibleTask$(() => {
    /**
     * We unmount the non-winning variants post-hydration in Vue.
     */
  });

  return (
    <Fragment>
      {!props.__isNestedRender && TARGET !== "reactNative" ? (
        <InlinedScript scriptStr={getScriptString()}></InlinedScript>
      ) : null}
      {state.shouldRenderVariants ? (
        <>
          <InlinedStyles
            id={`variants-styles-${props.content?.id}`}
            styles={hideVariantsStyleString.value}
          ></InlinedStyles>
          <InlinedScript scriptStr={variantScriptStr.value}></InlinedScript>
          {(getVariants(props.content) || []).map(function (variant) {
            return (
              <ContentComponent
                key={variant.testVariationId}
                content={variant}
                showContent={false}
                classNameProp={undefined}
                model={props.model}
                data={props.data}
                context={props.context}
                apiKey={props.apiKey}
                apiVersion={props.apiVersion}
                customComponents={props.customComponents}
                canTrack={props.canTrack}
                locale={props.locale}
                includeRefs={props.includeRefs}
                enrich={props.enrich}
                isSsrAbTest={state.shouldRenderVariants}
              ></ContentComponent>
            );
          })}
        </>
      ) : null}
      <ContentComponent
        {...{}}
        content={
          state.shouldRenderVariants
            ? props.content
            : handleABTestingSync({
                item: props.content,
                canTrack: getDefaultCanTrack(props.canTrack),
              })
        }
        classNameProp={`variant-${props.content?.id}`}
        showContent={true}
        model={props.model}
        data={props.data}
        context={props.context}
        apiKey={props.apiKey}
        apiVersion={props.apiVersion}
        customComponents={props.customComponents}
        canTrack={props.canTrack}
        locale={props.locale}
        includeRefs={props.includeRefs}
        enrich={props.enrich}
        isSsrAbTest={state.shouldRenderVariants}
      ></ContentComponent>
    </Fragment>
  );
});

export default ContentVariants;
