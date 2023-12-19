import styled from "styled-components";
import { NavBar } from "../NavBar";
import {
  clickedNoteIdState,
  clickedNoteInputValueState,
  inputValueState,
} from "../../recoil/newNote";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

const fetchDataFromLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
  return storedData
    .slice()
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
};

export const SideBar = () => {
  //   const inputValue = useRecoilValue(inputValueState);
  const setClickedNoteId = useSetRecoilState(clickedNoteIdState);
  const setClickedNoteInputValue = useSetRecoilState(
    clickedNoteInputValueState
  );

  //   const setClickedNoteId = useSetRecoilState(clickedNoteIdState);
  const [sortedData, setSortedData] = useState(fetchDataFromLocalStorage());

  const fetchDataAndSetState = () => {
    const updatedData = fetchDataFromLocalStorage();
    setSortedData(updatedData);
  };

  const handleNoteClick = (id, value) => {
    setClickedNoteId(id);
    setClickedNoteInputValue(value);
  };

  useEffect(() => {
    fetchDataAndSetState();
    const intervalId = setInterval(fetchDataAndSetState, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <StyledConatiner>
      <NavBar />
      {sortedData.map((note) => (
        <StyledNote
          onClick={() => handleNoteClick(note.id, note.inputValue)}
          key={note.id}
        >
          {note.inputValue} - {note.lastModified}
        </StyledNote>
      ))}
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  height: 100%;
  background-color: white;
`;

const StyledNote = styled.div`
  cursor: pointer;
  height: 5rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #dddddd;
  &:hover {
    background-color: rgb(228, 242, 254);
  }
`;
