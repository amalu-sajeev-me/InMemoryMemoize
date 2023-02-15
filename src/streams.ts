import { createWriteStream } from "fs";

export const writeFileStream = (path: string) => {
  const filePath = `${process.cwd()}/${path}`;
  return createWriteStream(filePath, { flags: "a", encoding: "utf8" });
};
