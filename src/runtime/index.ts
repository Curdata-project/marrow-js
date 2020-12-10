import { _request } from "./request";
import { _run } from "./sqlite";
import { _print } from "./swap";

export let preMemory: any;
export let malloc: any;
export let _result: any;

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
  _run,
  _print,
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
  main(123213, 12);
};
