const router = require("express").Router();
const {
  gettasklists,
} = require("../handlers/TaskListHandlers/CheckListHandlers1");
const { addUser } = require("../handlers/TaskListHandlers/AddUser");
const { addList } = require("../handlers/TaskListHandlers/addList");
router.get("/tasklist/:date/:user", gettasklists);
router.post("/adduser", addUser);
router.post("/addlist", addList);
// router.post("/checklists/addlist", addlist);
// router.post("/checklists/addtask", addtask);
// router.post("/");

module.exports = router;
