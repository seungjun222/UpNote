import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavBar } from "./NavBar";
import {
  clickedNewNoteButtonState,
  clickedNoteIdState,
} from "../../recoil/newNote";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

export const Content = () => {
  const clickedNoteId = useRecoilValue(clickedNoteIdState);
  const clickedNewNoteButton = useRecoilValue(clickedNewNoteButtonState);
  const [inputValue, setInputValue] = useState("");
  //   const [inputValue, setInputValue] = useRecoilState(inputValueState);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
    const existingData = storedData.find((data) => data.id === clickedNoteId);
    if (existingData) {
      setInputValue(existingData.inputValue);
    } else {
      setInputValue("");
    }
  }, [clickedNoteId]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
    const existingData = storedData.find((data) => data.id === clickedNoteId);

    if (existingData) {
      const updatedData = storedData.map((data) =>
        data.id === clickedNoteId ? { ...data, inputValue: inputValue } : data
      );
      localStorage.setItem("contentData", JSON.stringify(updatedData));
    } else {
      if (clickedNewNoteButton) {
        const newData = {
          id: clickedNoteId,
          inputValue: inputValue,
          lastModified: new Date().toLocaleString(),
        };
        const updatedData = [...storedData, newData];
        localStorage.setItem("contentData", JSON.stringify(updatedData));
      }
    }
  }, [inputValue, clickedNoteId]);

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
      {/* {clickedNoteId} */}
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
