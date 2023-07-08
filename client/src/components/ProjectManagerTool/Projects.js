import { styled, keyframes } from "styled-components";
import Header from "../Checklist/Header";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const Projects = () => {
  const { user } = useAuth0();
  return (
    <Main>
      <div>
        <Header />
        <Body>
          <SideBar>
            <NewProject>Create Project</NewProject>
          </SideBar>

          <ProjectsOverview>
            <Text>Projects Overview</Text>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <HeaderRow>
                    <TableHeader align="center">Project Title</TableHeader>
                    <TableHeader align="center">Due Date</TableHeader>
                    <TableHeader align="center">
                      Project Description
                    </TableHeader>
                    <TableHeader align="center">Members</TableHeader>
                    <TableHeader align="center">
                      Day's Left to Complete
                    </TableHeader>
                    <TableHeader align="center">Status</TableHeader>
                  </HeaderRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <Title align="center">Painting</Title>
                    <Title align="center">Friday december 2nd</Title>
                    <Title align="center">Painting Smith's House</Title>
                    <Title align="center">"user1", "user2", "user3"</Title>
                    <Title align="center">24days</Title>
                    <Title align="center">done</Title>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ProjectsOverview>

          <GradientBox></GradientBox>
        </Body>
      </div>
    </Main>
  );
};

export default Projects;
const Main = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
`;

const Body = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  position: relative;
  border: 1rem solid #00c4cc;
  margin: 5%;
`;
const gradientAnimation = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;
const GradientBox = styled.div`
  position: absolute;
  width: 100%;
  height: 70%;
  bottom: 0;
  background-image: linear-gradient(-30deg, #c1ff72, #ffde59);
  background-size: 200%;
  animation: ${gradientAnimation} 10s linear infinite;
  transform: skewY(-10deg);
  z-index: -2;
`;
const SideBar = styled.div`
  max-width: 25%;
  color: white;
  border-radius: 0.5rem;
  width: 20%;
  border-right: 1rem solid #00c4cc;
`;

const NewProject = styled.button`
  font-size: 2rem;
  color: white;
  border-radius: 0.5rem;
  background-color: orange;
  border: none;
  padding: 1rem;
  margin: 20%;
  padding: 2%;

  &:hover {
    background-color: yellow;
    color: black;
  }

  &:active {
    background-color: yellow;
  }
`;
const ProjectsOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 5%;
  gap: 2rem;
  border-radius: 0.5rem;
  color: orange;
  font-size: 2rem;
  height: 100%;
  width: 100%;
`;

const Text = styled.div``;
const TableHeader = styled(TableCell)`
  && {
    font-size: 1.5rem;
    color: white;
    background-color: blue;
  }
`;
const HeaderRow = styled(TableRow)`
  && {
    width: 300px;
  }
`;
const Title = styled(TableCell)`
  && {
    font-size: 1.5rem;
    color: black;
    background-color: white;
    border-bottom: 0.5rem solid green;
  }
`;
