import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderMain>
      <Logo>Bit</Logo>
      <TaskProject>
        <Tasks
          onClick={() => {
            navigate("/checklist");
          }}
        >
          Manage Your Tasks
        </Tasks>
        <Projects
          onClick={() => {
            navigate("/projects");
          }}
        >
          Manage Your Projects
        </Projects>
      </TaskProject>
      <LoginButton />
      <LogoutButton />
    </HeaderMain>
  );
};

export default Header;

const HeaderMain = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 10% 10%;
  align-items: center;
  justify-items: center;
  height: 15%;
  opacity: 1;
  width: 100%;
`;
const Logo = styled.div`
  color: white;
  opacity: 1;
  font-size: 8rem;
  margin-top: 1%;
`;

const TaskProject = styled.div`
  display: flex;
  gap: 2%;
`;

const Projects = styled.button`
  color: white;
  opacity: 1;
  border: none;
  font-size: 2rem;
  background-color: transparent;
  &:hover {
    color: yellow;
  }
  &:active {
    scale: 0.9;
  }
`;
const Tasks = styled.button`
  color: white;

  opacity: 1;
  border: none;
  font-size: 2rem;
  background-color: transparent;

  &:hover {
    color: yellow;
  }
  &:active {
    scale: 0.9;
  }
`;
