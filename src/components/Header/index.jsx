import styled from "styled-components";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { clickedNoteIdState, clickedNoteNameState } from "../../recoil/newNote";

export const Header = () => {
  const [clickedNoteId, setClickedNoteId] = useRecoilState(clickedNoteIdState);

  const handleButton = () => {
    const storedData = JSON.parse(localStorage.getItem("notebooks")) || [];
    const updatedData = storedData.map((note) => {
      if (note.id === clickedNoteId) {
        return {
          ...note,
          memos: [
            ...(note.memos || []),
            {
              id: Math.random(),
              inputValue: "New Note",
              lastModified: new Date().toLocaleString(),
            },
          ],
        };
      }
      return note;
    });

    localStorage.setItem("notebooks", JSON.stringify(updatedData));
  };

  return (
    <StyledConatiner>
      <StyledTitle>UpNote</StyledTitle>
      <StyledNewMemoButton onClick={handleButton}>New Note</StyledNewMemoButton>
    </StyledConatiner>
  );
};

const StyledTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledConatiner = styled.div`
  height: 3rem;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
`;
const StyledNewMemoButton = styled.button`
  width: 5rem;
  height: 75%;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  background-color: rgb(0, 120, 197);
  color: white;
`;
