import React, { useEffect } from "react";
import styled from "styled-components";
import { NavBar } from "../NavBar";
import {
  selectedNoteIdState,
  inputValueState,
  isWritingTextState,
} from "../../recoil/newNote";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

export const Content = () => {
  const selectedNoteId = useRecoilValue(selectedNoteIdState);
  const [inputValue, setInputValue] = useRecoilState(inputValueState);
  const setIsWritingText = useSetRecoilState(isWritingTextState);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
    const existingData = storedData.find((data) => data.id === selectedNoteId);

    if (existingData) {
      const updatedData = storedData.map((data) =>
        data.id === selectedNoteId ? { ...data, inputValue: inputValue } : data
      );
      localStorage.setItem("contentData", JSON.stringify(updatedData));
    } else {
      const newData = {
        id: selectedNoteId,
        inputValue: inputValue,
        lastModified: new Date().toLocaleString(),
      };
      const updatedData = [...storedData, newData];
      localStorage.setItem("contentData", JSON.stringify(updatedData));
    }
  }, [inputValue, selectedNoteId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsWritingText(true);
  };

  return (
    <StyledConatiner>
      <NavBar />
      <StyledInput onChange={handleInputChange} />
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  height: 100%;
  background-color: greenyellow;
`;
const StyledInput = styled.input``;
