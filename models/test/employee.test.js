const { default: mongoose } = require("mongoose");
const Employee = require("../employee.model");
const expect = require("chai").expect;

describe("employee", () => {
  it("should throw an error if no 'firstName' arg", () => {
    const employee = new Employee({});

    employee.validate((err) => {
      expect(err.errors.firstName).to.exist;
    });
  });

  it("should throw an error if firstName arg is not a String", () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      const employee = new Employee({ firstName });

      employee.validate((err) => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it("should not throw an error if 'firstName' is okay", () => {
    const cases = ["Krystian", "Wiktoria"];
    for (let firstName of cases) {
      const employee = new Employee({ firstName });

      employee.validate((err) => {
        expect(err.errors.firstName).to.not.exist;
      });
    }
  });

  it("should throw an error if no 'lastName' arg", () => {
    const employee = new Employee({});

    employee.validate((err) => {
      expect(err.errors.lastName).to.exist;
    });
  });

  it("should throw an error if lastName arg is not a String", () => {
    const cases = [{}, []];
    for (let lastName of cases) {
      const employee = new Employee({ lastName });

      employee.validate((err) => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it("should not throw an error if 'lastName' is okay", () => {
    const cases = ["Matkowski", "Dąbrowska"];
    for (let lastName of cases) {
      const employee = new Employee({ lastName });

      employee.validate((err) => {
        expect(err.errors.lastName).to.not.exist;
      });
    }
  });

  it("should throw an error if no 'department' arg", () => {
    const employee = new Employee({});

    employee.validate((err) => {
      expect(err.errors.department).to.exist;
    });
  });

  it("should throw an error if department arg is not a String", () => {
    const cases = [{}, []];
    for (let department of cases) {
      const employee = new Employee({ department });

      employee.validate((err) => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it("should not throw an error if 'department' is okay", () => {
    const cases = ["IT", "Management"];
    for (let department of cases) {
      const employee = new Employee({ department });

      employee.validate((err) => {
        expect(err.errors.department).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
