import { _request } from "./request";
import * as util from "util";

export let preMemory: any;
export let malloc: any;
export let _result: any;

const print = (s: number, size: number) => {
  const value = preMemory.buffer.slice(s, s + size);
  const utf8decoder = new util.TextDecoder();
  console.log(utf8decoder.decode(value));
};

export const _get_tx_bytes = (arg: string) => {
  const textEncoder = new util.TextEncoder();
  const typedArray = textEncoder.encode(arg);
  const ptr = malloc(typedArray.length);
  const Uint8Memory = new Uint8Array(preMemory.buffer);
  Uint8Memory.subarray(ptr, ptr + typedArray.length).set(typedArray);
  return ptr;
};

const env = {
  memory: {
    initial: 10,
    maximum: 100,
  },
  tableBase: 0,
  // @ts-ignore
  table: new WebAssembly.Table({
    initial: 0,
    element: "anyfunc"
  }),
  _request,
  print,
};

export const runModule = async (context: any[]) => {
  const typedArray = new Uint8Array(context);

  // 验证模块有效性
  // @ts-ignore
  const validate = WebAssembly.validate(typedArray);
  if (!validate) {
    return false;
  }

  // @ts-ignore
  const { instance, module } = await WebAssembly.instantiate(typedArray, { env });
  const { memory, main, __wbindgen_malloc, __result } = instance.exports;
  preMemory = memory;
  malloc = __wbindgen_malloc;
  _result = __result;
  main();
};
