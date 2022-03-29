const express = require("express");
const router = express.Router();

const DepartmentController = require("../controllers/departments.controller");

router.get("/departments", DepartmentController.getAll);
router.get("/departments/random", DepartmentController.getRandom);
router.get("/departments/:id", DepartmentController.getByID);
router.post("/departments", DepartmentController.addDepartment);
router.put("/departments/:id", DepartmentController.modifyDepartmentByID);
router.delete("/departments/:id", DepartmentController.deleteDepartment);

module.exports = router;
