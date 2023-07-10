import { styled, keyframes } from "styled-components";
import Header from "../Checklist/Header";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const Projects = ({ boardId, projectId }) => {
  const { user } = useAuth0();

  const [projects, setProjects] = useState({});

  useEffect(() => {
    if (user) {
      fetch(`/getProjects/${user.email}`)
        .then((response) => response.json())
        .then((parsed) => {
          setProjects(parsed.data);
        });
    }
  }, [user]);

  const navigate = useNavigate();
  console.log(projects);
  return (
    <Main>
      <Header />
      <Body>
        <ProjectsOverview>
          <Text>Projects Overview</Text>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <HeaderRow>
                  <TableHeader align="center">Project Title</TableHeader>
                  <TableHeader align="center">Due Date</TableHeader>
                  <TableHeader align="center">Project Description</TableHeader>
                  <TableHeader align="center">
                    Day's Left to Complete
                  </TableHeader>
                  <TableHeader align="center">Status</TableHeader>
                  <TableHeader align="center"></TableHeader>
                </HeaderRow>
              </TableHead>
              <TableBody>
                {Object.values(projects).map((project, index) => {
                  const Difference_In_Time =
                    new Date(project.dueDate).getTime() - new Date().getTime();
                  const Difference_In_Days = Math.floor(
                    Difference_In_Time / (1000 * 3600 * 24)
                  );
                  return (
                    <TableRow
                      onClick={() => {
                        navigate(`/projectdetails/${projectId}`);
                      }}
                    >
                      <ProjectRow align="center">{project.title}</ProjectRow>
                      <ProjectRow align="center">{project.dueDate}</ProjectRow>
                      <ProjectRow align="center">
                        {project.description}
                      </ProjectRow>
                      <ProjectRow align="center">
                        {Difference_In_Days}
                      </ProjectRow>
                      <ProjectRow align="center">{project.status}</ProjectRow>
                      <ProjectRow align="center">
                        <Delete
                          onClick={() => {
                            projects.splice(index, 1);
                            setProjects([...projects]);
                          }}
                        >
                          Delete
                        </Delete>
                      </ProjectRow>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ProjectsOverview>
        <AddProject>
          <CreateProject
            onClick={() => {
              navigate(`/createboard/${boardId}`);
            }}
          >
            Add New Project
          </CreateProject>
        </AddProject>
        <GradientBox></GradientBox>
      </Body>
    </Main>
  );
};

export default Projects;
const Main = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  position: relative;
`;

const Body = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width:100%
  height:100%;

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
const AddProject = styled.div`
  color: white;
  border-radius: 0.5rem;
`;

const CreateProject = styled.button`
  font-size: 1.5rem;
  color: white;
  border-radius: 0.5rem;
  background-color: orange;
  border: none;
  padding: 10%;

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

  margin: 5%;

  color: orange;
  font-size: 2rem;
`;

const Text = styled.div`
  margin: 5%;
  font-weight: bold;
`;
const TableHeader = styled(TableCell)`
  && {
    font-size: 1.5rem;
    color: green;
    border: 0.5rem solid orange;
    background-color: yellow;
    width: 15%;
  }
`;
const HeaderRow = styled(TableRow)`
  && {
    width: 100%;
  }
`;
const ProjectRow = styled(TableCell)`
  && {
    font-size: 1.5rem;
    color: black;
    background-color: white;
    border: 0.5rem solid green;
  }
`;
const Delete = styled.button`
  font-size: 1.5rem;
  color: white;
  border-radius: 0.5rem;
  background-color: orange;
  border: none;
  padding: 10%;

  &:hover {
    background-color: yellow;
    color: black;
  }

  &:active {
    background-color: yellow;
  }
`;
