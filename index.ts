import { EventEmitter } from "events";
import { createTracing } from "trace_events";
import { setInterval } from "timers/promises";
import { MEMORY_ERRORS, MEMORY_MESSAGES } from "./src/constants";
import { ICallback } from "./src/types";
import {} from "stream/promises";
import * as fs from "fs";
import { Readable } from "stream";
import { log } from "./src/utils";

export class InMemoryMemoize<T> extends EventEmitter {
  static instances: Set<string> = new Set();
  memoryName: string;
  ttl: number = 15000;
  store: Map<Symbol, T>;
  cronController: AbortController;
  constructor(name: string) {
    super();
    if (InMemoryMemoize.instances.has(name)) {
      this.emit("error", new Error(MEMORY_ERRORS.ALREADY_EXISTS));
    }
    this.cronController = new AbortController();
    InMemoryMemoize.instances.add(name);
    this.memoryName = name;
    this.store = new Map();
    // this.cron(this.flushAll);
    this.logEntries();
    log.info(`memoization memory ${name} created`);
  }
  add = (key: string, value: T) => {
    const keySymbol = Symbol.for(key);
    this.store.set(keySymbol, value);
    const data = Buffer.from(JSON.stringify(value));
    const stream = Readable.from(data, { emitClose: true });
    this.emit("data", value, stream);
    return { ...this, stream };
  };
  has = (key: string) => {
    return this.store.has(Symbol.for(key));
  };
  cron = async (cb: ICallback) => {
    const { ttl, cronController } = this;
    const { signal } = cronController;
    for await (const startTime of setInterval(ttl, Date.now(), { signal }))
      (() => {
        cb();
        console.log(startTime, MEMORY_MESSAGES.FLUSH_ALL);
      })();
  };

  flushAll = () => {
    const { store } = this;
    [...store.keys()].forEach((key) => store.delete(key));
  };

  cancelCron = () => this.cronController.abort();

  logEntries = () => {
    this.on("data", (data, stream: Readable) => {
      console.log("new entry", data);
      const path = `${process.cwd()}/log.txt`;
      const writeStream = fs.createWriteStream(path, {
        flags: "a",
        encoding: "utf-8",
      });
      stream.pipe(writeStream);
    });
  };
}
