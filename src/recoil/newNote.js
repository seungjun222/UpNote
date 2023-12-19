import { atom } from "recoil";

export const clickedNewMemoButtonState = atom({
  key: "clickedNewMemoButtonState",
  default: false,
});

export const inputValueState = atom({
  key: "inputValueState",
  default: "New Note",
});

export const isWritingTextState = atom({
  key: "isWritingTextState",
  default: false,
});

export const clickedMemoIdState = atom({
  key: "clickedMemoIdState",
  default: () => {
    const storedData = JSON.parse(localStorage.getItem("memos")) || [];
    if (storedData.length === 0) {
      return null;
    }
    return storedData[0].id;
  },
});
export const clickedNoteIdState = atom({
  key: "clickedNoteIdState",
  default: () => {
    const storedData = JSON.parse(localStorage.getItem("notebooks")) || [];
    if (storedData.length === 0) {
      return null;
    }
    return storedData[0].id;
  },
});
export const clickedNoteNameState = atom({
  key: "clickedNoteNameState",
  default: () => {
    const storedData = JSON.parse(localStorage.getItem("notebooks")) || [];
    if (storedData.length === 0) {
      return null;
    }
    return storedData[0].name;
  },
});
export const clickedNoteMemosState = atom({
  key: "clickedNoteMemosState",
  default: [],
});
