import { styled, keyframes, css } from "styled-components";
import Header from "../Checklist/Header";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { trashO } from "react-icons-kit/fa/trashO";
import { plus } from "react-icons-kit/fa/plus";
import { edit } from "react-icons-kit/fa/edit";
import { check } from "react-icons-kit/fa/check";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

const CheckList = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [value, onChange] = useState(new window.Date());
  const [task, setTask] = useState({});
  const [newTask, setNewTask] = useState("");
  const [checked, setChecked] = useState({});

  const Refresh = () => {
    fetch(`/tasklist/${value.toString().slice(0, 15)}/${currentUser.email}`)
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
    if (currentUser) {
      Refresh();
    }
  }, [value, currentUser]);

  const handleDelete = (index) => {
    fetch(
      `/deletetask/${value.toString().slice(0, 15)}/${
        currentUser.email
      }/${index}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((parsed) => {
        console.log(parsed);
        Refresh();
      })

      .catch((error) => console.log(error));
  };

  const handleUpdate = (input, index) => {
    console.log(input);
    setTask({});
    fetch("/updatetask", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: value.toString().slice(0, 15),
        user: currentUser.email,
        input: input,
        index: index,
        completed: task[index].completed,
      }),
    })
      .then((response) => response.json())
      .then((parsed) => {
        console.log(parsed);
        Refresh();
      })

      .catch((error) => console.log(error));
  };

  const applyLineThrough = (key) => {
    // setTask({
    //   ...task,
    //   [key]: { id: key, task: task[key].task, completed: !task[key].completed },
    // });
    fetch("/updatetask", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: value.toString().slice(0, 15),
        user: currentUser.email,
        input: task[key].task,
        index: key,
        completed: !task[key].completed,
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
    if (input.length > 0) {
      fetch("/addtask", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: value.toString().slice(0, 15),
          user: currentUser.email,
          input: input,
          index: index,
        }),
      })
        .then((response) => response.json())
        .then((parsed) => {
          console.log(parsed);
          setNewTask("");
          Refresh();
        })

        .catch((error) => console.log(error));
    }
  };
  console.log(task);

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
                <Tasklines key={key}>
                  <Edit onClick={(event) => handleUpdate(task[key].task, key)}>
                    <Icon icon={edit} size={50} />
                  </Edit>

                  {/* {typeof task[key] === "string" ? ( */}
                  <TaskInput
                    onChange={(event) => {
                      setTask({
                        ...task,
                        [key]: {
                          id: key,
                          task: event.target.value,
                          completed: task[key].completed,
                        },
                      });
                    }}
                    value={task[key].task || ""}
                    style={{
                      textDecoration:
                        task && task[key].completed ? "line-through" : "none",
                    }}
                  />
                  {/* ) : (
                    task[key]
                  )} */}

                  <CheckMark onClick={() => applyLineThrough(key)}>
                    <Icon icon={check} size={50} />
                  </CheckMark>

                  <Delete onClick={() => handleDelete(key)}>
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
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  // align-items: center;
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
  height: 85%;
  bottom: 0;
  background-image: linear-gradient(-30deg, #00c4cc, #ff66c4, pink);
  background-size: 200% 200%;
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
const listContainerFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);

    
  }
`;

const ListContainer = styled.div`
  background-image: url("./images/stickyn.png");
  background-size: contain;
  background-repeat: no-repeat;
  z-inex: 2;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5%;
  align-items: flex-start;
  animation: ${listContainerFadeIn} 2s ease-in-out;
`;
const ListHeader = styled.div`
  color: black;
  border-radius: 0.5rem;
  display: flex;
  font-size: 2rem;
  height: 5%;
  width: 50%;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  gap: 5%;
  margin-top: 10%;
  margin-left: 5%;
`;

const Date = styled.div``;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5%;
  height: 100%;
  width: 60%;
  margin-left: 5%;
`;
const AddTask = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  color: #cb6ce6;
  font-weight: bold;
  width: 80%;
  padding: 1%;
  font-size: 2rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 0.1rem 0.2rem 0 #808080, 0 0.1rem 0.2rem #808080;
  background-color: transparent;
`;
const AddButton = styled.button`
  background-color: transparent;
  border: none;
  width: 5%;
  &:hover {
    color: #cb6ce6;
  }
  &:active {
    scale: 0.9;
  }
`;

const Tasklines = styled.ul`
  width: 100%;
  height: 5%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  list-style: none;
`;
const TaskInput = styled.input`
  color: #cb6ce6;
  width: 70%;
  padding: 1%;
  font-weight: bold;
  font-size: 2rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 0.1rem 0.2rem 0 #808080, 0 0.1rem 0.2rem #808080;
  background-color: transparent;
  margin: 1.5%;
`;
const Delete = styled.button`
  background-color: transparent;
  border: none;
  width: 5%;
  &:hover {
    color: red;
    cursor: pointer;
  }
`;

const Edit = styled.div`
  margin: 0.1rem;
  width: 5%;
  &:hover {
    color: green;
    cursor: pointer;
  }
`;
const CheckMark = styled.div``;
