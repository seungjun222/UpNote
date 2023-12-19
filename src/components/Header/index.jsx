import styled from "styled-components";
import { useSetRecoilState } from "recoil";

export const Header = () => {
  const handleButton = () => {
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];
    const newData = {
      id: storedData.length + 1,
      inputValue: "New Note",
      lastModified: new Date().toLocaleString(),
    };
    const updatedData = [newData, ...storedData];
    localStorage.setItem("contentData", JSON.stringify(updatedData));
    localStorage.setItem("clickedNoteId", storedData.length + 1);
  };

  return (
    <StyledConatiner>
      <div></div>
      <StyledNewNoteButton onClick={handleButton}>New Note</StyledNewNoteButton>
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  height: 3rem;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
`;
const StyledNewNoteButton = styled.button`
  width: 5rem;
  height: 75%;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  background-color: rgb(0, 120, 197);
  color: white;
`;
