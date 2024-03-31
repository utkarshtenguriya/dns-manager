import { nanoid } from "nanoid";
import { DataInstanceInfr } from "../@types";

export const genRecordId = (payload: [DataInstanceInfr]) => {
  return payload.map((el) => {
    el.id = nanoid();
    return el;
  });
};
