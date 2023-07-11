import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import LogoutButton from "../Checklist/LogoutButton";

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderMain>
      <Logo
        onClick={() => {
          navigate("/");
        }}
      >
        Bit
      </Logo>
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
      <LogoutButton />
    </HeaderMain>
  );
};

export default Header;

const HeaderMain = styled.div`
  display: grid;
  grid-template-columns: 10% 50% 40%;
  justify-items: end;
  height: 15%;
  opacity: 1;
  width: 100%;
`;
const Logo = styled.div`
  color: #00c4cc;
  opacity: 1;
  font-size: 8rem;
  margin-top: 2rem;
`;

const TaskProject = styled.div`
  display: flex;

  gap: 10%;
`;

const Projects = styled.button`
  color: #00c4cc;
  opacity: 1;
  border: none;
  font-size: 2rem;
  background-color: transparent;

  &:hover {
    color: #cb6ce6;
  }
  &:active {
    scale: 0.9;
  }
`;
const Tasks = styled.button`
  color: #00c4cc;
  opacity: 1;
  border: none;
  font-size: 2rem;
  background-color: transparent;

  &:hover {
    color: #cb6ce6;
  }
  &:active {
    scale: 0.9;
  }
`;
