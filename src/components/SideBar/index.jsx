import styled from "styled-components";
import { NavBar } from "../NavBar";
import {
  isCreatingState,
  isWritingTextState,
  inputValueState,
} from "../../recoil/newNote";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

const fetchDataFromLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
  return storedData
    .slice()
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
};

export const SideBar = () => {
  const inputValue = useRecoilValue(inputValueState);
  //   const isCreating = useRecoilValue(isCreatingState);
  const isWritingText = useRecoilValue(isWritingTextState);
  const [sortedData, setSortedData] = useState(fetchDataFromLocalStorage());

  const fetchDataAndSetState = () => {
    const updatedData = fetchDataFromLocalStorage();
    setSortedData(updatedData);
  };

  useEffect(() => {
    fetchDataAndSetState();
    const intervalId = setInterval(fetchDataAndSetState, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [inputValue]);

  return (
    <StyledConatiner>
      <NavBar />
      {sortedData.map((note) => (
        <div key={note.id}>
          {note.inputValue} - {note.lastModified}
        </div>
      ))}
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  height: 100%;
  background-color: red;
`;
