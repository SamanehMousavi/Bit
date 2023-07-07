import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import LogoutButton from "../Checklist/LogoutButton";
import LoginButton from "../Checklist/LoginButton";

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
        <Projects>Manage Your Projects</Projects>
      </TaskProject>
      <LoginButton />
      <LogoutButton />
    </HeaderMain>
  );
};

export default Header;

const HeaderMain = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr 10% 10%;
  align-items: center;
  justify-items: center;
  align-content: space-between;
  height: 15vh;
  opacity: 1;
  width: 100vw;
`;
const Logo = styled.div`
  color: #00c4cc;
  opacity: 1;
  font-size: 8rem;
  margin-top: 2rem;
`;

const TaskProject = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 35rem;
  gap: 1rem;
  margin-right: 50rem;
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
  &:visited {
    ${(props) => props.textColor || "white"};
  }
`;
