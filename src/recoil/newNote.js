import { atom } from "recoil";

export const isCreatingState = atom({
  key: "isCreatingState",
  default: false,
});

export const selectedNoteIdState = atom({
  key: "selectedNoteIdState",
  default: 1,
});

export const inputValueState = atom({
  key: "inputValueState",
  default: "New Note",
});

export const isWritingTextState = atom({
  key: "isWritingTextState",
  default: false,
});
