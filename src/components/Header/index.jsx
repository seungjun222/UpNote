import styled from "styled-components";
import {
  clickedNoteIdState,
  clickedNoteInputValueState,
} from "../../recoil/newNote";
import { useSetRecoilState } from "recoil";

export const Header = () => {
  const setClickedNoteId = useSetRecoilState(clickedNoteIdState);

  const handleButton = () => {
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
    const newData = {
      id: storedData.length + 1,
      inputValue: "New Note",
      lastModified: new Date().toLocaleString(),
    };
    const updatedData = [newData, ...storedData];
    localStorage.setItem("contentData", JSON.stringify(updatedData));
    setClickedNoteId(storedData.length + 1);
  };

  return (
    <StyledConatiner>
      <div>헤더</div>
      <StyledNewNoteButton onClick={handleButton}>New Note</StyledNewNoteButton>
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  width: 100vw;
  height: 3rem;
  background-color: purple;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledNewNoteButton = styled.button`
  width: 5rem;
  height: 75%;
  border-radius: 0.3rem;
  cursor: pointer;
  background-color: rgb(0, 120, 197);
  color: white;
`;
