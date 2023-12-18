import styled from "styled-components";
import { isCreatingState } from "../../recoil/newNote";
import { useSetRecoilState } from "recoil";

export const Header = () => {
  const setIsCreatingState = useSetRecoilState(isCreatingState);

  const handleClickButton = () => {
    setIsCreatingState(true);
  };

  return (
    <StyledConatiner>
      <div>헤더</div>
      <StyledNewNoteButton onClick={handleClickButton}>
        New Note
      </StyledNewNoteButton>
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
  background-color: blue;
  color: white;
`;
