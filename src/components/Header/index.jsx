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
    localStorage.setItem("clickedMemoId", storedData.length + 1);
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
