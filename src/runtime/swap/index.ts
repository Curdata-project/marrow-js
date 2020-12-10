import * as util from "util";

import { malloc, preMemory, _result } from "../index";

// Send data to wasm
export const _get_tx_bytes = (arg: string) => {
  const textEncoder = new util.TextEncoder();
  const typedArray = textEncoder.encode(arg);
  const ptr = malloc(typedArray.length);
  const Uint8Memory = new Uint8Array(preMemory.buffer);
  Uint8Memory.subarray(ptr, ptr + typedArray.length).set(typedArray);
  _result(ptr, typedArray.length);
};

// Get wasm message
export const _print = (s: number, size: number) => {
  const value = preMemory.buffer.slice(s, s + size);
  const utf8decoder = new util.TextDecoder();
  console.log(utf8decoder.decode(value));
  return utf8decoder.decode(value);
};
