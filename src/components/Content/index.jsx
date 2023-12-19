import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavBar } from "./NavBar";
import {
  clickedNewMemoButtonState,
  clickedMemoIdState,
} from "../../recoil/newNote";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

export const Content = () => {
  const clickedMemoId = useRecoilValue(clickedMemoIdState);
  const clickedNewMemoButton = useRecoilValue(clickedNewMemoButtonState);
  const [inputValue, setInputValue] = useState("");
  //   const [inputValue, setInputValue] = useRecoilState(inputValueState);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
    const existingData = storedData.find((data) => data.id === clickedMemoId);
    if (existingData) {
      setInputValue(existingData.inputValue);
    } else {
      setInputValue("");
    }
  }, [clickedMemoId]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
    const existingData = storedData.find((data) => data.id === clickedMemoId);

    if (existingData) {
      const updatedData = storedData.map((data) =>
        data.id === clickedMemoId ? { ...data, inputValue: inputValue } : data
      );
      localStorage.setItem("contentData", JSON.stringify(updatedData));
    } else {
      if (clickedNewMemoButton) {
        const newData = {
          id: clickedMemoId,
          inputValue: inputValue,
          lastModified: new Date().toLocaleString(),
        };
        const updatedData = [...storedData, newData];
        localStorage.setItem("contentData", JSON.stringify(updatedData));
      }
    }
  }, [inputValue, clickedMemoId]);

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
