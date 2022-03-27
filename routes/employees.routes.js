const express = require("express");
const router = express.Router();
const Employe = require("../models/employe.model");

router.get("/employees", async (req, res) => {
  try {
    res.json(await Employe.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/employees/random", async (req, res) => {
  try {
    const count = await Employe.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employe.findOne().skip(rand);
    if (!emp) res.status(404).json({ message: err });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/employees/:id", async (req, res) => {
  try {
    const emp = await Employe.findById(req.params.id);
    if (!emp) res.status(404).json({ message: "Not found" });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/employees", async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmploye = new Employe({ firstName, lastName, department });
    await newEmploye.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/employees/:id", async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const emp = await Employe.findById(req.params.id);
    if (emp) {
      emp.firstName = firstName;
      emp.lastName = lastName;
      emp.department = department;
      await emp.save();
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/employees/:id", async (req, res) => {
  try {
    const emp = await Employe.findById(req.params.id);
    if (emp) {
      await Employe.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
