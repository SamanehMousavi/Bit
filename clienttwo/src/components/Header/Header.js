import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SignIn from "./SignIn";

const Header = ({ textColor }) => {
  const navigate = useNavigate();
  return (
    <HeaderMain>
      <Logo textColor={textColor}>Bit</Logo>
      <TaskProject>
        <Tasks
          onClick={() => {
            navigate("/checklist");
          }}
          textColor={textColor}
        >
          Manage Your Tasks
        </Tasks>
        <Projects textColor={textColor}>Manage Your Projects</Projects>
      </TaskProject>
      <SignIn />
    </HeaderMain>
  );
};

export default Header;

const HeaderMain = styled.div`
  display: grid;
  grid-template-columns: 20vw 1fr 15vw;
  align-items: center;
  justify-items: center;
  align-content: space-between;
  height: 15vh;
  opacity: 1;
  width: 100vw;
`;
const Logo = styled.div`
  ${(props) => props.textColor || "white"};
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
  ${(props) => props.textColor || "white"};
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
  ${(props) => props.textColor || "white"};
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
  &:visited {
    ${(props) => props.textColor || "white"};
  }
`;
