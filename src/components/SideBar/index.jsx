import styled from "styled-components";
import { NavBar } from "../NavBar";
import { isCreatingState } from "../../recoil/newNote";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

export const SideBar = () => {
  const isCreatingNote = useRecoilValue(isCreatingState);

  useEffect(() => {
    console.log("isCreatingNote", isCreatingNote);
  }, [isCreatingNote]);

  return (
    <StyledConatiner>
      <NavBar />
      사이드바
      {isCreatingNote && <div>New Note</div>}
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  height: 100%;
  background-color: red;
`;
