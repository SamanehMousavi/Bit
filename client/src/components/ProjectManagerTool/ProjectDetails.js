import { styled, keyframes } from "styled-components";
import Header from "../Checklist/Header";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
    items: tasks,
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
const ProjectDetails = () => {
  const [columns, setColumns] = useState(taskStatus);
  const [formData, setFormData] = useState({});

  const handleSelect = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const { user } = useAuth0();
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
  const handleSubmit = (e) => {
    //   e.preventDefault();
    //   fetch("/orders", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ order: formData }),
    //   })
    //     .then((res) => res.json())
    //     .then((parsed) => {
    //       if (parsed.status === 200) {
    //         console.log(parsed.data);
    //         navigate(`/confirm/${parsed.data.id}`);
    //       } else {
    //         alert(parsed.error);
    //       }
    //     });
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
                <input id="" name="" type="text" onChange={handleChange} />
                <label>Members Names</label>
                <input id="" name="" type="text" onChange={handleChange} />
                <label>Project Due Date</label>
                <input id="" name="" type="text" onChange={handleChange} />
                <label>Project Description</label>
                <input id="" name="" type="text" onChange={handleChange} />
                <label>Project Status</label>
                <select id="" name="" type="text" onChange={handleSelect}>
                  <option value="">In Progress</option>
                  <option value="">Done </option>
                </select>
                <SaveLink type="submit">Save</SaveLink>
              </Form>
            </FormContainer>
          </SideBar>
          <div>
            <h1 style={{ textAlign: "center" }}>Jira Board</h1>
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
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      key={columnId}
                    >
                      <h2>{column.name}</h2>
                      <div style={{ margin: 8 }} key={columnId}>
                        <Droppable droppableId={columnId}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                padding: 4,
                                width: 250,
                                minHeight: 500,
                              }}
                            >
                              {column.items.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
            </div>
          </div>
        </Body>
      </div>
    </Main>
  );
};
export default ProjectDetails;

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
  height: 100vh;
`;

const SideBarContent = styled.div`
  border: 0.5rem solid orange;
  padding: 1rem;
  color: black;
  width: 45%;
  margin: 10%;
`;
const Container = styled(DragDropContext)``;

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
`;
// return (
//     <>
//       {!menu ? (
//         <p>Loading...</p>
//       ) : (

//       )}
//     </>
//   );
// };
