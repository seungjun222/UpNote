import styled from "styled-components";
import {
  clickedNoteIdState,
  clickedNoteNameState,
} from "../../../recoil/newNote";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import React, { useEffect, useState } from "react";

export const NavBar = () => {
  const clickedNoteId = useRecoilValue(clickedNoteIdState);
  const clickedNoteName = useRecoilValue(clickedNoteNameState);

  // useEffect(() => {
  //   const notebooks = JSON.parse(localStorage.getItem("notebooks")) || [];
  //   const matching = notebooks.find(
  //     (notebook) => notebook.id === clickedNoteId
  //   );
  //   if (matching) {
  //     setClickedNoteName(matching.name);
  //   }
  //   console.log("clickedNoteId", clickedNoteId);
  // }, [clickedNoteId]);

  return (
    <StyledConatiner>
      {clickedNoteName}
      {clickedNoteId}
    </StyledConatiner>
  );
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
