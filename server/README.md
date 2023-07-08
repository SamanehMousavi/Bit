# Api Endpoints

| Endpoint                                      | Method   | Description          |
| --------------------------------------------- | -------- | -------------------- |
| [/adduser](#adduser)                          | `POST`   | Returns users object |
| [/addtask](#addtask)                          | `POST`   | Returns task object  |
| [/deletetask/:date/:user/:index](#deletetask) | `DELETE` | delete task          |
| [/tasklist/:date/user](#tasklist)             | `GET`    | get lists            |
| [/updatetask](#updatetaskt)                   | `PATCH`  | update tasks         |

- ## /adduser

- This endpoint expects the request body to contain the user information. If the user does not already exist in MongoDB, it inserts a new user object containing \_id, username, email, lists object and projects array into the "Users" collection. The response will have a status of 200 and a message indicating that a new user has been created.If the user already exists in the database, the handler will return a response with a status of 200 and a message indicating that the user is already logged in.

- ## /addtask
- this endpoints expects the request body to contain the date, user, and input properties. It also generates a unique identifier (index) for each task using the uuidv4 package.

- It queries the "Users" collection to find the user with the given ID. If the user is found, it creates a copy of the user's existing lists object.

- If the date already exists in the user's lists, it adds the new task to the existing date object. Otherwise, it creates a new date object with the task.

- The handler then updates the user's lists with the modified lists object in the database.

- If the update is successful, a response with a status of 200 and a message indicating that the list has been updated is returned.

- ## /deletetask/:date/:user/:index
- It finds the user with the given ID. If the user is found, it creates a copy of the user's existing lists object. Then it attemps to delete the task from the lists object by accessing the date and index properties. If the task is successfully deleted, the modified lists object is saved.The handler then updates the user's lists with the modified lists object in the database.If the update is successful, a response with a status of 200 and a message indicating that the list has been deleted is returned.

- ## /tasklist/:date/:user
- The handle queries the "Users" collection to find the user with the given ID. If the user is found, it retrieves the task list for the specified date from the user's lists objectIf the task list does not exist for the specified date, a response with a status of 404 and a message indicating that the date was not found is returned.
  If the task list exists, a response with a status of 200 and the task list data is returned.

- ## /updatetask
- The updateTask handler expects the request body to contain the date, user, input, and index properties, representing the date of the task, the user ID, the updated task input, and the index of the task to update, respectively. It then queries the "Users" collection to find the user with the given ID. If the user is found, it creates a copy of the user's existing lists object. The handler updates the task in the lists object by accessing the date, index, and input properties. The handler then updates the user's lists with the modified lists object in the database. If the update is successful, a response with a status of 200 and a message indicating that the list has been updated is returned.

# User Collection in MongoDB

```js
{
  _id_:"user_email",
  username: "user_name",
 email: "user_email",
  //Lists Object
  lists:{
    date:{
      shareWith:["user1", "user2", "user3"],
      task:[
        {id:"description"}
      ]
    }
  }
    Projects:[{
      title:"Painting",
      dueDate:"Friday december 2nd",
      description:"Painting Smith's House",
      members:["user1", "user2", "user3"],
      status:'done',
      task:{
        workQueue:{
          id:task1,
          id:task2,
          id:task3,
        }
        inProgress:{
          id:task1,
          id:task2,
          id:task3,}
        review:{
          id:task1,
          id:task2,
          id:task3,
        }
        done:{
          id:task1,
          id:task2,
          id:task3,
        }
      }

 } ]







  }











```
