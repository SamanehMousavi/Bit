import { styled, keyframes } from "styled-components";
import Header from "../Checklist/Header";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { trashO } from "react-icons-kit/fa/trashO";
import { plus } from "react-icons-kit/fa/plus";
import { edit } from "react-icons-kit/fa/edit";
import { useAuth0 } from "@auth0/auth0-react";

const CheckList = () => {
  const { user } = useAuth0();
  const [value, onChange] = useState("2017-01-01");
  const [task, setTask] = useState({});
  const [newTask, setNewTask] = useState("");

  console.log(user);
  const Refresh = () => {
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
  };

  useEffect(() => {
    Refresh();
  }, [value]);

  const handleDelete = (index) => {
    fetch(`/deletetask/${value.toString().slice(0, 15)}/user_id/${index}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        console.log(parsed);
        Refresh();
      })

      .catch((error) => console.log(error));
  };

  const handleUpdate = (input, index) => {
    setTask({});
    fetch("/updatetask", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: value.toString().slice(0, 15),
        user: "user_id",
        input: input,
        index: index,
      }),
    })
      .then((response) => response.json())
      .then((parsed) => {
        console.log(parsed);
        Refresh();
      })

      .catch((error) => console.log(error));
  };
  const handleSubmit = (input, index) => {
    setTask({});
    fetch("/addtask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: value.toString().slice(0, 15),
        user: "user_id",
        input: input,
        index: index,
      }),
    })
      .then((response) => response.json())
      .then((parsed) => {
        console.log(parsed);
        Refresh();
      })

      .catch((error) => console.log(error));
  };

  return (
    <Main>
      <Header />
      <Body>
        <CalendarContainer>
          <Calendar onChange={onChange} value={value} />
        </CalendarContainer>

        <ListContainer>
          <ListHeader>
            <Date> {value.toString().slice(0, 15)} </Date>
            <Share>Share</Share>
          </ListHeader>
          <List>
            <AddTask>
              <Input
                onChange={(event) => {
                  setNewTask(event.target.value);
                }}
                value={newTask}
              />
              <AddButton
                onClick={() =>
                  handleSubmit(newTask, Object.values(task).length)
                }
              >
                <Icon icon={plus} size={50} />
              </AddButton>
            </AddTask>
            {Object.keys(task).map((key, index) => {
              return (
                <Tasklines>
                  <Edit onClick={() => handleUpdate(task[key], key)}>
                    {" "}
                    <Icon icon={edit} size={50} />
                  </Edit>

                  <TaskInput
                    onChange={(event) => {
                      setTask({ ...task, [key]: event.target.value });
                    }}
                    // value={task[index]}
                    placeholder={task[key]}
                  />

                  <Delete
                    onClick={() => {
                      handleDelete(key);
                    }}
                  >
                    <Icon icon={trashO} size={50} />
                  </Delete>
                </Tasklines>
              );
            })}
          </List>
        </ListContainer>

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
  background-image: url("./images/stickynote.png");
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
  height: 70%;
  bottom: 0;
  background-image: linear-gradient(-30deg, #00c4cc, #ff66c4);
  background-size: 200%;
  animation: ${gradientAnimation} 10s linear infinite;
  transform: skewY(-10deg);
  z-index: -2;
`;

const CalendarContainer = styled.div`
  max-width: 25%;
  height: fit-content;
  margin: 5%;
  background-color: #00c4cc;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;

  .react-calendar__navigation {
    display: flex;
  }
  .react-calendar__navigation__label {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .react-calendar__navigation__arrow {
    flex-grow: 0.333;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-decoration: none;
  }

  button {
    font-size: 1.5rem;
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

const ListContainer = styled.div`
  z-inex: 2;
  width: 50%;
  height: 100%;
  margin: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
`;
const ListHeader = styled.div`
  color: white;
  border-radius: 0.5rem;
  display: flex;
  font-size: 2rem;
  height: 5%;
  width: 50%;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  margin: 5%;
  background-color: #cb6ce6;
`;

const Date = styled.div``;
const Share = styled.button`
  font-size: 2rem;
  color: white;
  border-radius: 0.5rem;
  background-color: transparent;
  border: none;
  padding: 1rem;

  &:hover {
    background-color: #cb6ce6;
  }

  &:active {
    background-color: pink;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
`;
const AddTask = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 70%;
  padding: 1%;
  font-size: 2rem;
  border-radius: 0.5rem;
  border: none;
  // box-shadow: 0 0.1rem 0.2rem 0 #808080, 0 0.1rem 0.2rem #808080;
  background-color: #00c4cc;
`;
const AddButton = styled.button`
  background-color: transparent;
  border: none;
  width: 5%;
  &:hover {
    color: green;
  }
`;

const Tasklines = styled.ul`
  width: 100%;
  height: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
`;
const TaskInput = styled.input`
  width: 70%;
  padding: 1%;
  font-weight: bold;
  font-size: 2rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #00c4cc;
  margin: 1.5%;
`;
const Delete = styled.button`
  background-color: transparent;
  border: none;
  width: 5%;
  &:hover {
    color: red;
  }
`;

const Edit = styled.div`
  margin: 0.1rem;
  width: 5%;
  &:hover {
    color: green;
  }
`;
