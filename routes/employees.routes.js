const express = require("express");
const router = express.Router();

const employeesController = require("../controllers/employees.controller");

router.get("/employees", employeesController.getAll);
router.get("/employees/random", employeesController.getRandom);
router.get("/employees/:id", employeesController.getByID);
router.post("/employees", employeesController.AddEmploye);
router.put("/employees/:id", employeesController.modifyEmployeByID);
router.delete("/employees/:id", employeesController.deleteEmploye);

module.exports = router;
