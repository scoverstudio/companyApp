const { default: mongoose } = require("mongoose");
const Employee = require("../employee.model");
const expect = require("chai").expect;

describe("Employee", () => {
  before(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/companyDBtest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe("Reading data", () => {
    before(async () => {
      const testEmpOne = new Employee({
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: "Wiktoria",
        lastName: "Dabrowska",
        department: "Marketing",
      });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const employee = await Employee.findOne({
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      });

      const expectedEmployee = {
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      };

      expect(employee.firstName).to.be.equal(expectedEmployee.firstName);
      expect(employee.lastName).to.be.equal(expectedEmployee.lastName);
      expect(employee.department).to.be.equal(expectedEmployee.department);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Creating data", () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Updating data", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: "Wiktoria",
        lastName: "Dabrowska",
        department: "Marketing",
      });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        {
          firstName: "Krystian",
          lastName: "Matkowski",
          department: "IT",
        },
        {
          $set: {
            firstName: "Arek",
            lastName: "Kowalski",
            department: "Driver",
          },
        }
      );

      const updatedEmployee = await Employee.findOne({
        firstName: "Arek",
        lastName: "Kowalski",
        department: "Driver",
      });

      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({
        firstName: "Wiktoria",
        lastName: "Dabrowska",
        department: "Marketing",
      });
      employee.firstName = "Daria";
      employee.lastName = "Kowalska";
      employee.department = "IT";
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: "Daria",
        lastName: "Kowalska",
        department: "IT",
      });

      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany(
        {},
        {
          $set: {
            firstName: "Updated!",
            lastName: "Updated!",
            department: "Updated!",
          },
        }
      );
      const employees = await Employee.find({
        firstName: "Updated!",
        lastName: "Updated!",
        department: "Updated!",
      });

      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Removing data", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: "Wiktoria",
        lastName: "Dabrowska",
        department: "Marketing",
      });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      });

      const removedEmployee = await Employee.findOne({
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      });
      await employee.remove();

      const removedEmployee = await Employee.findOne({
        firstName: "Krystian",
        lastName: "Matkowski",
        department: "IT",
      });

      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employee = await Employee.find();
      expect(employee.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  after(() => {
    mongoose.models = {};
  });
});
