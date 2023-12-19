import { atom } from "recoil";

export const clickedNewMemoButtonState = atom({
  key: "clickedNewMemoButtonState",
  default: false,
});

export const clickedMemoIdState = atom({
  key: "clickedMemoIdState",
  default: null,
});
export const clickedNoteIdState = atom({
  key: "clickedNoteIdState",
  default: null,
});
export const clickedNoteNameState = atom({
  key: "clickedNoteNameState",
  default: null,
});
export const clickedNoteMemosState = atom({
  key: "clickedNoteMemosState",
  default: [],
});
