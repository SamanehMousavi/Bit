import { styled, keyframes } from "styled-components";
import Header from "../Checklist/Header";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// useEffect(() => {
//   fetch("/")
//     .then((response) => {
//       const { tasks, taskStatus } = response.data;
//       setColumns(taskStatus);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }, []);

const tasks = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" },
];
const taskStatus = {
  requested: {
    name: "Requested",
    items: [],
  },
  toDo: {
    name: "To do",
    items: [],
  },
  inProgress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const CreateBoard = () => {
  const { user } = useAuth0();
  const [columns, setColumns] = useState(taskStatus);
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({});
  const [addTask, setAddTask] = useState({});
  const navigate = useNavigate();

  const handleSelect = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const addTaskhandleChange = (event) => {
    setAddTask({
      ...addTask,
      [event.target.id]: event.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddTask = (id) => {
    const name = columns[id].name;
    const newArray = [...columns[id].items];
    newArray.push({ id: newArray.length + 1, content: addTask[id] });
    setColumns({ ...columns, [id]: { name: name, items: newArray } });
    setAddTask({});
  };
  console.log(addTask);
  const handleDelete = (columnId, index) => {
    const name = columns[columnId].name;
    const newArray = [...columns[columnId].items];
    console.log(name);
    console.log(newArray);
    console.log(columnId);
    console.log(index);
    newArray.splice(index, 1);
    setColumns({ ...columns, [columnId]: { name: name, items: newArray } });
    setAddTask({});
  };
  const handleSubmit = (e) => {
    console.log("I was clicked");
    fetch("/addProject", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.projectTitle,
        description: formData.projectDescription,
        dueDate: formData.start,
        taskData: columns,
        user: user.email,
      }),
    })
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.status === 200) {
          console.log(parsed.data);
          navigate("/projects");
        } else {
          alert(parsed.error);
        }
      });
  };
  return (
    <Main>
      <div>
        <Header />
        <Body>
          <SideBar>
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <label>Project Title</label>
                <input
                  id="projectTitle"
                  name="projectTitle"
                  type="text"
                  onChange={handleChange}
                />
                <label>Members Names</label>
                <input
                  id="membersName"
                  name="membersName"
                  type="text"
                  onChange={handleChange}
                />

                <label>Project Description</label>
                <input
                  id="projectDescription"
                  name="projectDescription"
                  type="text"
                  onChange={handleChange}
                />
                {/* <label>Project Status</label>
                <select
                  id="projectStatus"
                  name="projectStatus"
                  type="text"
                  onChange={handleSelect}
                >
                  <option value="">In Progress</option>
                  <option value="">Done </option>
                </select> */}
                <label for="start">Project Due Date</label>
                <input
                  type="date"
                  id="start"
                  name="start"
                  value={formData.start}
                  onChange={handleChange}
                />
              </Form>
            </FormContainer>
          </SideBar>
          <div>
            <h1 style={{ textAlign: "center" }}></h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
              >
                {Object.entries(columns).map(([columnId, column]) => (
                  <div key={columnId}>
                    <h2>{column.name}</h2>
                    <Droppable droppableId={columnId}>
                      {(provided) => (
                        <ItemList
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {column.items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <Item
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {item.content}
                                  <Delete
                                    onClick={() =>
                                      handleDelete(columnId, index)
                                    }
                                  >
                                    delete
                                  </Delete>
                                </Item>
                              )}
                            </Draggable>
                          ))}
                          <div>
                            <input
                              type="text"
                              id={columnId}
                              value={addTask[columnId]}
                              onChange={addTaskhandleChange}
                            />
                            <button onClick={() => handleAddTask(columnId)}>
                              {" "}
                              New Task{" "}
                            </button>
                          </div>
                          {provided.placeholder}
                        </ItemList>
                      )}
                    </Droppable>
                  </div>
                ))}
              </DragDropContext>
            </div>

            <SaveLink type="submit" onClick={handleSubmit}>
              Save
            </SaveLink>
          </div>
        </Body>
      </div>
    </Main>
  );
};
export default CreateBoard;

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const SideBar = styled.div`
  width: 25%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ItemList = styled.div`
  background-color: white;
  padding: 8px;
  width: 250px;
  min-height: 500px;
  background-color: pink;
`;

const Item = styled.div`
  user-select: none;
  padding: 16px;
  margin-bottom: 8px;
  min-height: 50px;
  background-color: #456c86;
  color: purple;
`;
const FormContainer = styled.div`
  display: flex;
  background-color: #20cd8d;
  border: none;
  flex-direction: column;
  align-items: center;
  padding: 10%;
  border-radius: 0.5rem;
`;
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 200px;
  align-items: center;
  font-size: 1.5rem;
  gap: 2rem;
  padding: 10%;
  color: white;
  width: 100%;
`;

const SaveLink = styled.button`
  font-size: 20px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #cb6ce6;
  border: none;
  border-radius: 0.5rem;
  &:hover {
    background-color: yellow;
    color: black;
  }

  &:active {
    background-color: yellow;
  }
  margin-top: 30%;
`;
const Calendar = styled(DatePicker)`
  color: black;
  width: 100%;
  display: flex;
  position: relative;
  z-index: 2;
`;

const Delete = styled.button``;
