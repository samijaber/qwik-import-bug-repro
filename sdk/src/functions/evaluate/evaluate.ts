import { logger } from "./logger.js";
import { isBrowser } from "./is-browser.js";
import { isNonNodeServer } from "./is-non-node-server.js";

/**
 * We need to lazy-load this module so it doesn't leak into the browser, as it is massive and not needed there.
 * https://css-tricks.com/dynamic-conditional-imports/
 */
const runInNonNode = isNonNodeServer()
  ? await import("./non-node-runtime.js")
      .then((m) => {
        return m.runInNonNode;
      })
      .catch((err) => {
        const ERROR_MESSAGE = `Error importing JS interpreter for non-Node.js runtimes. Make sure \`js-interpreter\` is installed.
      Read more here: https://github.com/BuilderIO/builder/tree/main/packages/sdks/README.md#non-nodejs-runtimes-edge-serverless
      `;
        logger.error(ERROR_MESSAGE, err);
        return () => {
          logger.error(ERROR_MESSAGE);
          return 3;
        };
      })
  : () => 10;

export function evaluate() {
  if (isBrowser()) return runInBrowser();
  if (isNonNodeServer()) return runInNonNode();
  return runInNode();
}
export const runInBrowser = () => {
  return 10;
};
export const runInNode = () => {
  return 10;
};
