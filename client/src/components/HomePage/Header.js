import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  return (
    <HeaderMain>
      <Logo>Bit</Logo>
      {user && (
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
      )}
      <LoginButton />
      <LogoutButton />
    </HeaderMain>
  );
};

export default Header;

const HeaderMain = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 20%;
  align-items: center;
  justify-items: end;
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
  gap: 10%;
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
