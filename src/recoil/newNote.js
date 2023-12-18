import { atom } from "recoil";

export const isCreatingState = atom({
  key: "isCreatingState",
  default: false,
});

export const selectedNoteIdState = atom({
  key: "selectedNoteIdState",
  default: 1,
});
