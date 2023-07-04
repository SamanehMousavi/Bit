const router = require("express").Router();
const {
  addlist,
  updatelist,
  deletelist,
  getchecklists,
  addtask,
  updatetask,
  deletetask,
  adduser,
  deleteuser,
} = require("../handlers/CheckListHandlers");

router.get("/checklists", getchecklists);
router.post("/checklists/addlist", addlist);
router.post("/checklists/addtask", addtask);
router.post("/");

module.exports = router;
