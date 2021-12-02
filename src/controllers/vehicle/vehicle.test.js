const { makeVehicleEntity } = require("./vehicleEntity");
const { makeVehicleBusinessLogic } = require("./vehicleLogic");
const { makeVehicleStore } = require("./vehicleStore");
const { makeHelper } = require("../../helpers");
const { makeTestDb } = require("../../test/database");

const helper = makeHelper();
const db = makeTestDb({ helper });
const store = makeVehicleStore({ db, helper });
const entity = makeVehicleEntity({ helper });
const businessLogic = makeVehicleBusinessLogic({ store, entity, helper });
const { createBatchVehicleOwners, editSingleVehicleOwner } = businessLogic;

const user = {
  status: true,
  user: {
    id: "aa09kk4r-asdf7889-asdf",
    fullName: "Jhon Doe",
    userName: "jhon.d",
  },
};

describe("Vehicle tests", () => {
  it("Throws authorization error if the user is not authorized", async () => {
    user.status = false;
    expect(() => createBatchVehicleOwners({ isAuthorized: user })).toThrow(
      "Not Authorized"
    );
  });

  it("Throws authorization error if the user is not authorized", async () => {
    user.status = false;
    expect(() => editSingleVehicleOwner({ isAuthorized: user })).toThrow(
      "Not Authorized"
    );
  });
});

