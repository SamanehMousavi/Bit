# Endpoints

| Endpoint                          | Method | Description                             |
| --------------------------------- | ------ | --------------------------------------- |
| [/checklists](#checklists)        | `GET`  | Returns an array of all checklists      |
| [/checklist/:\_id](#checklist_id) | `GET`  | Returns checklist information as object |
| [/checklist/tasks](#items)        | `GET`  | Returns an array of added tasks         |
| [/checklist](#checklists)         | `POST` | Creates a new List                      |

|

Users Collection

```js
{
  "_id":"user_id",
  "username": "user_name",
  "email": "user_email",
  lists:{
    "04/07/2023":{
      shareWith:[user1, user2, user3],
      task:[
        {id:1,
        description:taskdescription,
        completed:false


        }
      ]
    }
  }
  }

```
