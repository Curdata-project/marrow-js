# marrow-js

### request api

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

### sqlite 支持

```javascript
function open(s);
function get(s);
function run(s);
```



