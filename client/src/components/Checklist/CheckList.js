import { styled, keyframes } from "styled-components";
import Header from "../Checklist/Header";
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
      <Header />
      <Body>
        <CalendarContainer>
          <Calendar onChange={onChange} value={value} />
        </CalendarContainer>

        <List>
          <ListHeader>
            <TitleDate>
              <Date> {value.toString().slice(0, 15)} </Date>
            </TitleDate>
            <Share>Share</Share>
          </ListHeader>
          <ListTasks>
            <CheckBox></CheckBox>
            <Taskline>HELLLO</Taskline>
            <AddTask>Add Task</AddTask>
          </ListTasks>
        </List>

        <GradientBox></GradientBox>
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
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
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
  height: 45%;
  bottom: 0;
  background-image: linear-gradient(-30deg, #00c4cc, #ff66c4);
  background-size: 200%;
  animation: ${gradientAnimation} 10s linear infinite;
  transform: skewY(-10deg);
  z-index: -2;
`;

const CalendarContainer = styled.div`
  max-width: 30%;
  height: fit-content;
  margin: 7%;
  background-color: #00c4cc;
  color: white;
  border-radius: 0.5rem;
  font-size: 1rem;

  .react-calendar__navigation {
    display: flex;
  }
  .react-calendar__navigation__label {
    font-weight: bold;
    font-size: 1rem;
  }
  .react-calendar__navigation__arrow {
    flex-grow: 0.333;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-decoration: none;
  }

  button {
    font-size: 1rem;
    background-color: transparent;
    border: 0;
    border-radius: 3px;
    color: white;
    padding: 0.5rem 0.05rem;

    &:hover {
      background-color: #cb6ce6;
    }

    &:active {
      background-color: pink;
    }
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.5;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }
`;

const List = styled.div`
  background-image: url("/Sticky-Note.png");
  z-inex: 1;
  width: 70%;
  height: 100%;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
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
const Taskline = styled.div``;

const AddTask = styled.div``;
