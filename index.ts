import { EventEmitter } from "events";
import { setInterval } from "timers/promises";
import {
  InMemoryMemoizeDefaultOptions,
  MEMORY_ERRORS,
  MEMORY_EVENTS,
  MEMORY_MESSAGES,
} from "./src/constants";
import { ICallback, IInMemoryMemoiseOptions } from "./src/types";
import {} from "stream/promises";
import { Readable } from "stream";
import { log } from "./src/utils";
import { writeFileStream } from "./src/streams";

export class InMemoryMemoize<T> extends EventEmitter {
  static instances: Set<string> = new Set();
  memoryName: string;
  ttl?: number;
  store: Map<Symbol, T>;
  cronController: AbortController;
  constructor(name: string, options?: IInMemoryMemoiseOptions) {
    super();
    if (InMemoryMemoize.instances.has(name)) {
      this.emit(MEMORY_EVENTS.ERROR, new Error(MEMORY_ERRORS.ALREADY_EXISTS));
    }
    if (options) Object.assign(InMemoryMemoizeDefaultOptions, options);
    const { logFile, ttl } = options || {};
    this.cronController = new AbortController();
    InMemoryMemoize.instances.add(name);
    this.memoryName = name;
    this.store = new Map<Symbol, T>();
    this.ttl = ttl;
    ttl && this.cron(this.flushAll);
    logFile && this.logEntries(logFile);
    log.info(`memoization memory ${name} created`);
  }
  add = (key: string, value: T) => {
    const keySymbol = Symbol.for(key);
    this.store.set(keySymbol, value);
    const data = Buffer.from(JSON.stringify(value));
    const stream = Readable.from(data, { emitClose: true });
    this.emit(MEMORY_EVENTS.DATA, value, stream);
    return { ...this, stream };
  };
  has = (key: string) => {
    return this.store.has(Symbol.for(key));
  };
  get = (key: string) => {
    return this.store.get(Symbol.for(key));
  };
  cron = async (cb: ICallback) => {
    const { ttl, cronController } = this;
    const { signal } = cronController;
    for await (const startTime of setInterval(ttl, Date.now(), { signal }))
      (() => {
        cb();
        log.log(startTime, MEMORY_MESSAGES.FLUSH_ALL);
      })();
  };

  flushAll = () => {
    const { store } = this;
    [...store.keys()].forEach((key) => store.delete(key));
  };

  cancelCron = () => this.cronController.abort();

  logEntries = (path: string) => {
    this.on(MEMORY_EVENTS.DATA, (_data, stream: Readable) => {
      stream.pipe(writeFileStream(path));
    });
  };
}
