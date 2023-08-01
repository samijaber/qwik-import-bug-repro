import { RenderContent, processContentResult, getContent } from "../../sdk-src";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export interface MainProps {
  url: string;
}

const apiKey = "f1a790f8c3204b3b8c5c1795aeac4660";

export const useBuilderContentLoader = routeLoader$(async (event) => {
  const data = await getContent({
    model: "page",
    apiKey,
    userAttributes: {
      urlPath: event.url.pathname,
    },
  });

  if (!data) {
    event.status(404);
  }

  return data;
});

export default component$(() => {
  const contentProps = useBuilderContentLoader();
  return contentProps.value ? (
    <RenderContent
      content={contentProps.value}
      model={"page"}
      apiKey={apiKey}
    />
  ) : (
    <div>Content Not Found</div>
  );
});
