# Endpoints

| Endpoint                          | Method | Description                             |
| --------------------------------- | ------ | --------------------------------------- |
| [/checklists](#checklists)        | `GET`  | Returns an array of all checklists      |
| [/checklist/:\_id](#checklist_id) | `GET`  | Returns checklist information as object |
| [/checklist/tasks](#items)        | `GET`  | Returns an array of added tasks         |
| [/checklist](#checklists)         | `POST` | Creates a new List                      |

|

User Collection

```js
{
  "status": 200,
  "_id":"use_id",
  "username": "user_name",
  "email": "user_email"
  }

```

Checklists Collection

```js

  {
"_id":"checklist_id",
"title":"checklist",
"userId":"user_id",
"shareWith":["user_id1", "user_id2"]
"tasks":[
  {
    "taskId":"taskId1",
    "description":"task description",
    "completed":"false",

  }
],
"createdAt":"creation_date",
"updatedAt":"last_update_date"

  }

```
