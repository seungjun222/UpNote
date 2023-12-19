import styled from "styled-components";
import { NavBar } from "./NavBar";
import {
  clickedNoteIdState,
  clickedNoteNameState,
  clickedNoteMemosState,
} from "../../recoil/newNote";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { ReactComponent as Trash } from "../../assets/trash.svg";

import Swal from "sweetalert2";

const fetchDataFromLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem("notebooks")) || [];
  return storedData;
};

export const SideBarNotes = () => {
  const setClickedNoteMemos = useSetRecoilState(clickedNoteMemosState);
  const [clickedNoteId, setClickedNoteId] = useRecoilState(clickedNoteIdState);
  const setClickedNoteName = useSetRecoilState(clickedNoteNameState);
  const [sortedData, setSortedData] = useState(fetchDataFromLocalStorage());

  const fetchDataAndSetState = () => {
    const updatedData = fetchDataFromLocalStorage();
    setSortedData(updatedData);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const currentData = fetchDataFromLocalStorage();
    const noteToDelete = currentData.find((note) => note.id === id);

    if (noteToDelete) {
      Swal.fire({
        title: "정말 삭제하시겠습니까?",
        text: "한 번 삭제하면 되돌릴 수 없습니다!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedData = currentData.filter((note) => note.id !== id);
          localStorage.setItem("notebooks", JSON.stringify(updatedData));
          if (clickedNoteId === id) {
            setClickedNoteId(null);
          }
          setSortedData(updatedData);
          Swal.fire({
            title: "삭제 완료!",
            text: "노트북이 성공적으로 삭제되었습니다.",
            icon: "success",
          });
        }
      });
    }
  };

  const handleNoteClick = (id, name, memos) => {
    setClickedNoteId(id);
    setClickedNoteName(name);
    setClickedNoteMemos(memos);
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
          onClick={() => handleNoteClick(note.id, note.inputValue, note.memos)}
          key={note.id}
          isSelected={note.id === clickedNoteId}
        >
          <StyledContentWrapper>
            <StyledInputValue>
              {note.inputValue}
              {note.memos && note.memos.length > 0 && (
                <StyledMemosLength>{note.memos.length}</StyledMemosLength>
              )}
            </StyledInputValue>
          </StyledContentWrapper>
          <StyledButtonWrapper>
            <StyledDeleteButton onClick={(e) => handleDelete(e, note.id)} />
          </StyledButtonWrapper>
        </StyledNote>
      ))}
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  height: 100%;
  background-color: white;
  border-right: 1px solid #dddddd;
`;

const StyledNote = styled.div`
  cursor: pointer;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #dddddd;
  display: flex;
  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: rgb(244, 244, 244);
  `}
`;
const StyledInputValue = styled.div`
  font-size: 1.1rem;
`;
const StyledMemosLength = styled.span`
  font-size: 1rem;
  margin-left: 0.3rem;
  color: rgb(160, 160, 178);
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
`;
const StyledDeleteButton = styled(Trash)`
  width: 1rem;
  height: 1rem;
`;
