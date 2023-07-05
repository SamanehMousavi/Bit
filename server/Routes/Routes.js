const router = require("express").Router();
const {
  addlist,
  updatelist,
  deletelist,
  gettasklists,
  addtask,
  updatetask,
  deletetask,
  adduser,
  deleteuser,
} = require("../handlers/CheckListHandlers");

router.get("/tasklist/:date/:user", gettasklists);
// router.post("/checklists/addlist", addlist);
// router.post("/checklists/addtask", addtask);
// router.post("/");

module.exports = router;
