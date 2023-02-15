export type ICallback = () => void;
export interface IInMemoryMemoiseOptions {
  ttl?: number;
  logFile?: string;
  logInfo?: boolean;
}
