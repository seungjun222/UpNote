import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavBar } from "./NavBar";
import {
  clickedNewMemoButtonState,
  clickedMemoIdState,
  clickedNoteIdState,
} from "../../recoil/newNote";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

export const Content = () => {
  const clickedNoteId = useRecoilValue(clickedNoteIdState);
  const clickedMemoId = useRecoilValue(clickedMemoIdState);
  const clickedNewMemoButton = useRecoilValue(clickedNewMemoButtonState);
  const [inputValue, setInputValue] = useState("");
  //   const [inputValue, setInputValue] = useRecoilState(inputValueState);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("notebooks")) || [];
    const existingData = storedData.find((data) => {
      if (data?.id === clickedNoteId) {
        const memo = data?.memos?.find((memo) => memo?.id === clickedMemoId);
        return memo !== undefined;
      }
      return false;
    });
    if (existingData) {
      const memo = existingData.memos.find((memo) => memo.id === clickedMemoId);
      setInputValue(memo.inputValue);
    } else {
      setInputValue("");
    }
  }, [clickedMemoId]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("notebooks")) || [];
    const existingData = storedData.find((data) => {
      if (data?.id === clickedNoteId) {
        const memo = data?.memos?.find((memo) => memo?.id === clickedMemoId);
        return memo !== undefined;
      }
      return false;
    });
    if (existingData) {
      const updatedData = storedData.map((data) =>
        data?.memos?.find((memo) => memo?.id === clickedMemoId)
          ? {
              ...data,
              memos: data.memos.map((memo) =>
                memo.id === clickedMemoId
                  ? { ...memo, inputValue: inputValue }
                  : memo
              ),
            }
          : data
      );
      localStorage.setItem("notebooks", JSON.stringify(updatedData));
    } else {
      if (clickedNewMemoButton) {
        const newData = {
          id: clickedNoteId,
          memos: [
            ...(storedData.find((data) => data?.id === clickedNoteId)?.memos ||
              []),
            {
              id: Math.random(),
              inputValue: inputValue,
              lastModified: new Date().toLocaleString(),
            },
          ],
        };
        const updatedData = [
          ...storedData.filter((data) => data?.id !== clickedNoteId),
          newData,
        ];
        localStorage.setItem("notebooks", JSON.stringify(updatedData));
      }
    }
  }, [inputValue, clickedMemoId, clickedNoteId]);

  //   const debouncedHandleInputChange = debounce((value) => {
  //     setInputValue(value);
  //   }, 1000);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <StyledConatiner>
      <NavBar />
      <StyledInput
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      {/* {clickedMemoId} */}
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  height: 100%;
  background-color: white;
`;
const StyledInput = styled.input`
  padding: 1rem 2rem;

  border: none;
  font-size: 1.5rem;
  &:focus {
    outline: none;
  }
`;
