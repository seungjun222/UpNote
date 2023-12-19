import styled from "styled-components";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { clickedNoteIdState, clickedNoteNameState } from "../../recoil/newNote";
import upnote from "../../assets/upnote.png";

export const Header = () => {
  const [clickedNoteId, setClickedNoteId] = useRecoilState(clickedNoteIdState);

  const handleButton = () => {
    const storedData = JSON.parse(localStorage.getItem("notebooks")) || [];
    const updatedData = storedData.map((note) => {
      if (note.id === clickedNoteId) {
        return {
          ...note,
          memos: [
            {
              id: Math.random(),
              inputValue: "New Note",
              lastModified: new Date().toLocaleString(),
            },
            ...(note.memos || []),
          ],
        };
      }
      return note;
    });

    localStorage.setItem("notebooks", JSON.stringify(updatedData));
  };

  return (
    <StyledConatiner>
      <StyledUpNoteWrapper>
        <StyledLogo src={upnote} alt="UpNote" />
        <StyledTitle>UpNote</StyledTitle>
      </StyledUpNoteWrapper>
      <StyledNewMemoButton onClick={handleButton}>New Note</StyledNewMemoButton>
    </StyledConatiner>
  );
};

const StyledUpNoteWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const StyledTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
const StyledLogo = styled.img`
  max-height: 1.5rem;
`;
const StyledConatiner = styled.div`
  height: 3rem;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
`;
const StyledNewMemoButton = styled.button`
  font-size: 1.1rem;
  width: 6.5rem;
  height: 75%;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  background-color: rgb(0, 120, 197);
  color: white;
`;
