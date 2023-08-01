import { logger } from "./logger";
import Interpreter from "js-interpreter";

export const runInNonNode = () => {
  try {
    const myInterpreter = new Interpreter("10");
    myInterpreter.run();
    return 10;
  } catch (e) {
    logger.warn(
      "Custom code error in non-node runtime. SDK can only execute ES5 JavaScript.",
      {
        e,
      }
    );
    return 32;
  }
};
