import { atom } from "recoil";

export const clickedNewNoteButtonState = atom({
  key: "clickedNewNoteButtonState",
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

export const clickedNoteIdState = atom({
  key: "clickedNoteIdState",
  default: () => {
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
    if (storedData.length === 0) {
      return null;
    }
    const latestNote = storedData.reduce((prev, current) =>
      new Date(prev.lastModified) > new Date(current.lastModified)
        ? prev
        : current
    );

    return latestNote.id;
  },
});
export const clickedNoteInputValueState = atom({
  key: "clickedNoteInputValueState",
  default: () => {
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
    if (storedData.length === 0) {
      return null;
    }
    const latestNote = storedData.reduce((prev, current) =>
      new Date(prev.lastModified) > new Date(current.lastModified)
        ? prev
        : current
    );

    return latestNote.inputValue;
  },
});
