# marrow-js

A runtime framework for WebAssembly module compiled by 🦀️ Rust.

The following capabilities 💪 are provided for the wasm module:

1. Pass the message through a string with runtime framework.
2. Use Http or RPC to interact with other modules.
3. Use Sqlite to store data.

## Capabilities


### Pass messages

Send data to wasm:

```typescript
function _get_tx_bytes (arg: string) => _result(ptr, length) => void;
```

Get wasm message:

```typescript
function _print (ptr, length) => string;
```

### Request API

```javascript
async function request(config);
```

```rust
struct RequestArgs {
  method: Option<String>,
  path: Option<String>,
  headers: Hashmap<String, String>,
  data: serde_json::Value,
}

struct RequestResult {
  code: u16,
  headers: Hashmap<String, String>,
  data: serde_json::Value,
}

async fn request(args: &RequestArgs) -> RequestResult;
```

```javascript

args = {
  method: "POST",
  path: "...",
  headers: {},
  data: {}
}

result = {
  code: 200,
  data: {},
  headers: {},
}

```

method: `<actor_name>.<func_name>`

### sqlite

```javascript
function run(ptr, length);
```

## Contributing

1. Clone the repository

```sh
git clone https://github.com/Curdata-project/marrow-js.git
```

2. Install dependencies and run 🚀

```sh
cd marrow-js
npm install
npm run dev
```
