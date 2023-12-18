import styled from "styled-components";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { Content } from "../components/Content";

export const Main = () => {
  return (
    <StyledConatiner>
      <Header />
      <NavBar />
      <StyledContentWrapper>
        <SideBar />
        <Content />
      </StyledContentWrapper>
    </StyledConatiner>
  );
};

const StyledConatiner = styled.div`
  min-width: 1400px;
  max-width: 1920px;
  height: 100vh;
  background-color: skyblue;
`;

const StyledContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.425fr 1.575fr;
  height: calc(100vh - 6rem);
`;
