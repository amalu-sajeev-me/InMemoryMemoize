import { IInMemoryMemoiseOptions } from "./types";

export const enum MEMORY_ERRORS {
  ALREADY_EXISTS = "a memory with same name already exists",
}

export const enum MEMORY_MESSAGES {
  FLUSH_ALL = "flushing all keys and values",
}

export const enum COLOR_CODES {
  RED = "\x1b[31m%s\x1b[0m",
  GREEN = "\x1b[32m%s\x1b[0m",
  CYAN = "\x1b[36m%s\x1b[0m",
  BLUE = "\x1b[34m%s\x1b[0m",
  YELLOW = "\x1b[33m%s\x1b[0m",
}

export const InMemoryMemoizeDefaultOptions: IInMemoryMemoiseOptions = {
  logFile: "store.log",
  logInfo: true,
  ttl: 15000,
};

export const enum MEMORY_EVENTS {
  DATA = "data",
  ERROR = "error",
}
