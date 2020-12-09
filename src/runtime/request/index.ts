import axios from "axios";
import { preMemory, malloc, _result } from "../index";
import * as util from "util";

type Method = "GET" | "POST" | "PUT";
type RequestConfig = {
  method: Method;
  url: string;
  headers: any;
  data: any;
};


const sendArguments = (s: number, size: number): RequestConfig => {
  const value = preMemory.buffer.slice(s, s + size);
  const utf8decoder = new util.TextDecoder();
  const string = utf8decoder.decode(value);
  const json = JSON.parse(string);
  const method = utf8decoder.decode(new Uint8Array(json.method)) as Method;
  const url = utf8decoder.decode(new Uint8Array(json.url));
  const headers = utf8decoder.decode(new Uint8Array(json.headers));
  const data = utf8decoder.decode(new Uint8Array(json.data));
  return {
    method,
    url,
    headers,
    data,
  };
};

export const _request = async (s: number, size: number) => {
  const { method, url, headers, data } = sendArguments(s, size);

  try {
    const result = await axios({
      method,
      url,
      headers,
      data,
    });

    const utf8encode = new util.TextEncoder();

    const typedArray = utf8encode.encode(result.data);

    const ptr = malloc(typedArray.length);
    const Uint8Memory = new Uint8Array(preMemory.buffer);
    Uint8Memory.subarray(ptr, ptr + typedArray.length).set(typedArray);

    _result(ptr, typedArray.length);
  } catch (error) {
    console.log(error, "error");
  }
};
