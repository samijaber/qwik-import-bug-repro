import { getDefaultRegisteredComponents } from "../../constants/builder-registered-components.js";

import { TARGET } from "../../constants/target.js";

import ComponentsContext from "../../context/components.context";

import {
  BuilderContextInterface,
  BuilderRenderState,
  RegisteredComponents,
} from "../../context/types.js";

import {
  components,
  serializeComponentInfo,
} from "../../functions/register-component.js";

import { ComponentInfo } from "../../types/components.js";

import { Dictionary } from "../../types/typescript.js";

import Blocks from "../blocks/blocks";

import { getRenderContentScriptString } from "../content-variants/helpers.js";

import InlinedScript from "../inlined-script";

import EnableEditor from "./components/enable-editor";

import ContentStyles from "./components/styles";

import {
  getContentInitialValue,
  getContextStateInitialValue,
} from "./content.helpers.js";

import { ContentProps } from "./content.types.js";

import { wrapComponentRef } from "./wrap-component-ref.js";

import {
  Fragment,
  component$,
  h,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";

export const contentSetState = function contentSetState(
  props,
  state,
  newRootState: BuilderRenderState
) {
  state.builderContextSignal.rootState = newRootState;
};
export const ContentComponent = component$((props: ContentProps) => {
  const state = useStore<any>(
    {
      builderContextSignal: {
        content: getContentInitialValue({
          content: props.content,
          data: props.data,
        }),
        localState: undefined,
        rootState: getContextStateInitialValue({
          content: props.content,
          data: props.data,
          locale: props.locale,
        }),
        rootSetState: undefined,
        context: props.context || {},
        apiKey: props.apiKey,
        apiVersion: props.apiVersion,
        componentInfos: [
          ...getDefaultRegisteredComponents(),
          // While this `components` object is deprecated, we must maintain support for it.
          // Since users are able to override our default components, we need to make sure that we do not break such
          // existing usage.
          // This is why we spread `components` after the default Builder.io components, but before the `props.customComponents`,
          // which is the new standard way of providing custom components, and must therefore take precedence.
          ...components,
          ...(props.customComponents || []),
        ].reduce<Dictionary<ComponentInfo>>(
          (acc, { component: _, ...info }) => ({
            ...acc,
            [info.name]: serializeComponentInfo(info),
          }),
          {}
        ),
        inheritedStyles: {},
      },
      registeredComponents: [
        ...getDefaultRegisteredComponents(),
        // While this `components` object is deprecated, we must maintain support for it.
        // Since users are able to override our default components, we need to make sure that we do not break such
        // existing usage.
        // This is why we spread `components` after the default Builder.io components, but before the `props.customComponents`,
        // which is the new standard way of providing custom components, and must therefore take precedence.
        ...components,
        ...(props.customComponents || []),
      ].reduce<RegisteredComponents>(
        (acc, { component, ...info }) => ({
          ...acc,
          [info.name]: {
            component: component,
            ...serializeComponentInfo(info),
          },
        }),
        {}
      ),
      scriptStr: getRenderContentScriptString({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        variationId: props.content?.testVariationId!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        contentId: props.content?.id!,
      }),
    },
    { deep: true }
  );
  useContextProvider(
    ComponentsContext,
    useStore({ registeredComponents: state.registeredComponents })
  );

  return (
    <EnableEditor
      content={props.content}
      model={props.model}
      context={props.context}
      apiKey={props.apiKey}
      canTrack={props.canTrack}
      locale={props.locale}
      includeRefs={props.includeRefs}
      enrich={props.enrich}
      classNameProp={props.classNameProp}
      showContent={props.showContent}
      builderContextSignal={state.builderContextSignal}
      {...{}}
    >
      {props.isSsrAbTest ? (
        <InlinedScript scriptStr={state.scriptStr}></InlinedScript>
      ) : null}
      {TARGET !== "reactNative" ? (
        <ContentStyles
          contentId={state.builderContextSignal.content?.id}
          cssCode={state.builderContextSignal.content?.data?.cssCode}
          customFonts={state.builderContextSignal.content?.data?.customFonts}
        ></ContentStyles>
      ) : null}
      <Blocks
        blocks={state.builderContextSignal.content?.data?.blocks}
        context={state.builderContextSignal}
        registeredComponents={state.registeredComponents}
      ></Blocks>
    </EnableEditor>
  );
});

export default ContentComponent;
