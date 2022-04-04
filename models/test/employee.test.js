const { default: mongoose } = require("mongoose");
const Employe = require("../employe.model");
const expect = require("chai").expect;

describe("Employe", () => {
  it("should throw an error if no 'firstName' arg", () => {
    const employe = new Employe({});

    employe.validate((err) => {
      expect(err.errors.firstName).to.exist;
    });
  });

  it("should throw an error if firstName arg is not a String", () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      const employe = new Employe({ firstName });

      employe.validate((err) => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it("should not throw an error if 'firstName' is okay", () => {
    const cases = ["Krystian", "Wiktoria"];
    for (let firstName of cases) {
      const employe = new Employe({ firstName });

      employe.validate((err) => {
        expect(err.errors.firstName).to.not.exist;
      });
    }
  });

  it("should throw an error if no 'lastName' arg", () => {
    const employe = new Employe({});

    employe.validate((err) => {
      expect(err.errors.lastName).to.exist;
    });
  });

  it("should throw an error if lastName arg is not a String", () => {
    const cases = [{}, []];
    for (let lastName of cases) {
      const employe = new Employe({ lastName });

      employe.validate((err) => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it("should not throw an error if 'lastName' is okay", () => {
    const cases = ["Matkowski", "Dąbrowska"];
    for (let lastName of cases) {
      const employe = new Employe({ lastName });

      employe.validate((err) => {
        expect(err.errors.lastName).to.not.exist;
      });
    }
  });

  it("should throw an error if no 'department' arg", () => {
    const employe = new Employe({});

    employe.validate((err) => {
      expect(err.errors.department).to.exist;
    });
  });

  it("should throw an error if department arg is not a String", () => {
    const cases = [{}, []];
    for (let department of cases) {
      const employe = new Employe({ department });

      employe.validate((err) => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it("should not throw an error if 'department' is okay", () => {
    const cases = ["IT", "Management"];
    for (let department of cases) {
      const employe = new Employe({ department });

      employe.validate((err) => {
        expect(err.errors.department).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
