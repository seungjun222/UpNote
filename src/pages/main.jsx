import styled from "styled-components";
import { Header } from "../components/Header";
import { SideBarNotes } from "../components/SideBarNotes";
import { SideBarMemos } from "../components/SideBarMemos";
import { Content } from "../components/Content";

export const Main = () => {
  return (
    <StyledConatiner>
      <Header />
      <StyledContentWrapper>
        <SideBarNotes />
        <SideBarMemos />
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
  grid-template-columns: 0.325fr 0.425fr 1.25fr;
  height: calc(100vh - 3rem);
`;
