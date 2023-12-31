import styled from "styled-components";
import { clickedNoteNameState } from "../../../recoil/newNote";
import { useRecoilValue } from "recoil";

export const NavBar = () => {
  const clickedNoteName = useRecoilValue(clickedNoteNameState);

  return <StyledConatiner>{clickedNoteName}</StyledConatiner>;
};

const StyledConatiner = styled.div`
  height: 3rem;
  background-color: rgb(248, 248, 248);
  padding-left: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
`;
