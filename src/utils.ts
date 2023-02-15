import { COLOR_CODES } from "./constants";

export namespace log {
  type Args = any[];
  export const info = (...args: Args) => {
    console.log(COLOR_CODES.GREEN, "[info]", ...args);
  };
  export const warn = (...args: Args) => {
    console.log(COLOR_CODES.YELLOW, "[warn]", ...args);
  };
  export const error = (...args: Args) => {
    console.log(COLOR_CODES.RED, "[error]", ...args);
  };
  export const log = (...args: Args) => {
    console.log(COLOR_CODES.BLUE, "[log]", ...args);
  };
}
