const express = require("express");
const router = express.Router();

const employeesController = require("../controllers/employees.controller");

router.get("/employees", employeesController.getAll);
router.get("/employees/random", employeesController.getRandom);
router.get("/employees/:id", employeesController.getByID);
router.post("/employees", employeesController.AddEmployee);
router.put("/employees/:id", employeesController.modifyEmployeeByID);
router.delete("/employees/:id", employeesController.deleteEmployee);

module.exports = router;
