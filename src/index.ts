import * as events from "events";
import { getModule } from "./modules";
import { runModule } from "./runtime";
import * as koa from "koa";
import * as koaBody from "koa-bodyparser";
import { registerActor } from "./modules";
const server = new koa();

server.use(koaBody());

server.use((ctx: koa.Context) => {
  const buffer = ctx.request.body.data.data;
  registerActor(new Uint8Array(buffer));
  ctx.body = buffer;
  ctx.status = 200;
});

server.listen(3003, () => {
  console.log("server is running on 3003");
});

export const event = new events.EventEmitter();

event.on("run", (id: string) => {
  const module = getModule(id[0]);
  runModule(module.body);
});
