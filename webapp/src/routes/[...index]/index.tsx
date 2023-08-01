import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { RenderContent, getContent } from "@builder.io/sdk-qwik";

const apiKey = "f1a790f8c3204b3b8c5c1795aeac4660";

export const useBuilderContentLoader = routeLoader$(async (event) => {
  const data = await getContent({
    model: "page",
    apiKey: apiKey,
    userAttributes: { urlPath: event.url.pathname },
  });

  if (!data) {
    throw event.error(404, "page not found");

    // if you want to handle the 404 in the component, you can do this instead of throwing `event.error()`
    // event.status(404);
  }

  return data;
});

export default component$(() => {
  const content = useBuilderContentLoader();

  // if using `event.status(404)`, uncomment these lines:
  // if (content === null) {
  //   return <h1>Page not found</h1>;
  // }

  return <RenderContent model="page" content={content.value} apiKey={apiKey} />;
});
