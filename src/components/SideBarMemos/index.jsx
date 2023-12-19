import styled from "styled-components";
import { NavBar } from "./NavBar";
import {
  clickedMemoIdState,
  clickedNoteIdState,
  inputValueVisibleState,
} from "../../recoil/newNote";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { ReactComponent as Trash } from "../../assets/trash.svg";
import Swal from "sweetalert2";

export const SideBarMemos = () => {
  const setInputValueVisible = useSetRecoilState(inputValueVisibleState);

  const clickedNoteId = useRecoilValue(clickedNoteIdState);
  const [clickedMemoId, setClickedMemoId] = useRecoilState(clickedMemoIdState);

  const fetchDataFromLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem("notebooks")) || [];
    const clickedNotebook = storedData.find(
      (notebook) => notebook?.id === clickedNoteId
    );
    const memos = clickedNotebook ? clickedNotebook.memos : [];
    return memos;
  };

  const [sortedData, setSortedData] = useState(fetchDataFromLocalStorage());

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const memosData = fetchDataFromLocalStorage();
    const memoToDelete = memosData.find((memo) => memo.id === id);
    if (memoToDelete) {
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
          const storedData = JSON.parse(localStorage.getItem("notebooks"));
          const updatedData = storedData?.map((notebook) => {
            if (notebook?.id === clickedNoteId) {
              const updatedMemos = notebook.memos.filter(
                (memo) => memo?.id !== id
              );
              return { ...notebook, memos: updatedMemos };
            }
            return notebook;
          });
          localStorage.setItem("notebooks", JSON.stringify(updatedData));
          if (clickedMemoId === id) {
            setClickedMemoId(null);
          }
          setSortedData(updatedData);
          Swal.fire({
            title: "삭제 완료!",
            text: "메모가 성공적으로 삭제되었습니다.",
            icon: "success",
          });
        }
      });
    }
  };

  const handleMemoClick = (id) => {
    setClickedMemoId(id);
    setInputValueVisible(true);
  };

  const handleNewMemoButton = () => {
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

  const fetchDataAndSetState = () => {
    const updatedData = fetchDataFromLocalStorage();
    setSortedData(updatedData);
  };

  useEffect(() => {
    fetchDataAndSetState();
    const intervalId = setInterval(fetchDataAndSetState, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [clickedNoteId]);

  return (
    <StyledConatiner>
      <NavBar />
      {sortedData &&
        sortedData?.length > 0 &&
        sortedData.map((memo) => (
          <StyledNote
            onClick={() => handleMemoClick(memo.id)}
            key={memo.id}
            isSelected={memo.id === clickedMemoId}
          >
            <StyledContentWrapper>
              <StyledInputValue>{memo.inputValue}</StyledInputValue>
              <StyledLastModified>{memo.lastModified}</StyledLastModified>
            </StyledContentWrapper>
            <StyledDeleteButtonWrapper>
              <StyledDeleteButton onClick={(e) => handleDelete(e, memo.id)} />
            </StyledDeleteButtonWrapper>
          </StyledNote>
        ))}
      {clickedNoteId && (!sortedData || sortedData.length === 0) && (
        <StyledNewMemoButtonWrapper>
          <StyledNewMemoButton onClick={handleNewMemoButton}>
            New Note
          </StyledNewMemoButton>
        </StyledNewMemoButtonWrapper>
      )}
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
  height: 5rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #dddddd;
  display: flex;
  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: rgb(228, 242, 254);
  `}
`;
const StyledInputValue = styled.div`
  font-size: 1.1rem;
`;
const StyledLastModified = styled.div`
  font-size: 0.8rem;
  color: #aaaaaa;
`;
const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const StyledDeleteButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
`;
const StyledDeleteButton = styled(Trash)`
  width: 1rem;
  height: 1rem;
`;

const StyledNewMemoButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  margin-top: 15rem;
`;
const StyledNewMemoButton = styled.button`
  font-size: 1.1rem;
  font-weight: bold;
  width: 6.5rem;
  height: 100%;
  border: none;
  cursor: pointer;
  background-color: white;
  color: rgb(0, 120, 197);
`;
