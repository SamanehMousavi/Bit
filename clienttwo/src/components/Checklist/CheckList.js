import { styled, keyframes } from "styled-components";
import Header from "../Header/Header";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";

const CheckList = () => {
  const [value, onChange] = useState("2017-01-01");
  const [task, setTask] = useState();
  useEffect(() => {
    fetch(`/tasklist/${value.toString().slice(0, 15)}/user_id`)
      .then((response) => response.json())
      .then((parsed) => {
        if (parsed.status === 404) {
          throw new Error(parsed.message);
        }

        setTask(parsed.data.task);
      })
      .catch((error) => {
        setTask([]);
        console.log("Error fetching data:", error);
      });
  }, [value]);

  return (
    <Main>
      <Header textColor="black" />
      <Body>
        <SideBar>
          <Calendar onChange={onChange} value={value} />
          <Calander>Calander</Calander>
        </SideBar>
        <ListsContainer>
          <List>
            <ListHeader>
              <TitleDate>
                <Date> {value.toString().slice(0, 15)} </Date>
              </TitleDate>
              <Share>Share</Share>
            </ListHeader>
            <ListTasks>
              <CheckBox></CheckBox>
              <Task>HELLLO</Task>
            </ListTasks>
          </List>
        </ListsContainer>
        <GradientBox />
      </Body>
    </Main>
  );
};

export default CheckList;
const Main = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 30vw 70vw;
  justify-content: center;
  height: 85vh;
  width: 100vw;
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
  margin: 2rem;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(-30deg, #00c4cc, #ff66c4, #ffa53b);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s linear infinite;
  transform: skewY(-20deg);
  border-radius: 2rem;
`;

const SideBar = styled.div`
  width: 100%;
  border: 0.5rem solid blue;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-left: 0;
`;

const Calander = styled.button`
  font-size: 2rem;
`;

const ListsContainer = styled.div`
  border: 0.5rem solid blue;
  height: 100vh;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-left: 0;
  width: 80%;
`;
const List = styled.div`
  border: 0.5rem solid blue;
  width: 50%;
  height: 75%;
  display: flex;
  flex-direction: column;
`;
const ListHeader = styled.div`
  display: flex;
  height: 15%;
  align-items: center;
  justify-content: space-between;
  margin: 2rem;
  border: 0.5rem solid blue;
`;
const TitleDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;
`;
const Title = styled.div`
  padding: 1rem;
`;
const Date = styled.div`
  padding: 1rem;
`;
const Share = styled.button`
  margin: 1rem;
`;
const ListTasks = styled.div`
  display: flex;
  height: 85%;
  margin: 2rem;
  border: 0.5rem solid blue;
  position: relative;
`;

const CheckBox = styled.div`
  position: absolute;
  margin: 1rem;
  height: 2rem;
  width: 2rem;
  background-color: #eee;
  &:hover {
    background-color: yellow;
  }
`;
const Task = styled.div``;
