import axios from "axios";

import { _result } from "../index";
import { _get_tx_bytes, _print } from "../swap";

type Method = "GET" | "POST" | "PUT";
type RequestConfig = {
  method: Method;
  url: string;
  headers: any;
  data: any;
};

const sendArguments = (s: number, size: number): RequestConfig => {
  const string = _print(s, size);
  return JSON.parse(string);
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

    _get_tx_bytes(result.data);
  } catch (error) {
    console.log(error, "error");
  }
};
