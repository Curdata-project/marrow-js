import { v4 as uuidv4 } from "uuid";
import { event } from "../index";
const actorModules: any[] = [];

export const registerActor = (typedArray: any) => {
  const id = uuidv4();
  const name = "test_wasm";
  const module = {
    id,
    name,
    body: typedArray,
  };
  actorModules.push(module);
  event.emit("run", [id]);
};

export const getModule = (id: string) => {
  return actorModules.find(item => item.id === id);
};

export const deleteActor = (id: string) => {

};
