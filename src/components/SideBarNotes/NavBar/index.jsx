import styled from "styled-components";
import { ReactComponent as Plus } from "../../../assets/plus.svg";
import Swal from "sweetalert2";

export const NavBar = () => {
  const handlePlusButton = () => {
    Swal.fire({
      title: "Create New NoteBook",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Create",
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name || name.length < 2) {
          Swal.showValidationMessage("최소 2글자 이상의 이름을 입력하세요!");
          return false;
        }
        const storedData = JSON.parse(localStorage.getItem("notebooks")) || [];
        const newData = {
          id: Math.random(),
          inputValue: name,
        };
        const updatedData = [...storedData, newData];
        localStorage.setItem("notebooks", JSON.stringify(updatedData));
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <StyledConatiner>
      <StyledTitle>NOTEBOOKS</StyledTitle>
      <StyleButtonWrapper>
        <StyledPlusButton onClick={handlePlusButton} />
      </StyleButtonWrapper>
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  height: 3rem;
  background-color: white;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
`;
const StyledTitle = styled.div`
  font-size: 1.2rem;
  color: rgb(55, 132, 198);
  font-weight: bold;
`;
const StyleButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const StyledPlusButton = styled(Plus)`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  fill: rgb(55, 132, 198);
`;
