const router = require("express").Router();
const { gettasklists } = require("../handlers/TaskListHandlers/getTaskLists");
const { addUser } = require("../handlers/TaskListHandlers/AddUser");
const { addTask } = require("../handlers/TaskListHandlers/addTask");
const { updateTask } = require("../handlers/TaskListHandlers/updateTask");
const { deleteTask } = require("../handlers/TaskListHandlers/deleteTask");
router.get("/tasklist/:date/:user", gettasklists);
router.post("/adduser", addUser);
router.post("/addtask", addTask);
router.patch("/updatetask", updateTask);
router.delete("/deletetask/:date/:user/:index", deleteTask);

module.exports = router;
