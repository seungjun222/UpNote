import styled from "styled-components";
import { ReactComponent as Plus } from "../../../assets/plus.svg";
import Swal from "sweetalert2";

export const NavBar = () => {
  const handlePlusButton = () => {
    Swal.fire({
      title: "Create New MemoBook",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Create",
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        const storedData = JSON.parse(localStorage.getItem("MemoBooks")) || [];
        const newData = {
          id: storedData.length + 1,
          inputValue: name,
        };
        const updatedData = [...storedData, newData];
        localStorage.setItem("MemoBooks", JSON.stringify(updatedData));
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
`;
const StyleButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: 1rem;
`;

const StyledPlusButton = styled(Plus)`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;
