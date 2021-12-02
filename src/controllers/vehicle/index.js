const { makeVehicleEntity } = require("./vehicleEntity");
const { makeVehicleBusinessLogic } = require("./vehicleLogic");
const { makeVehicleStore } = require("./vehicleStore");

const makeVehicleController = ({ db, helper }) => {
  const store = makeVehicleStore({ db, helper });
  const entity = makeVehicleEntity({ helper });
  const businessLogic = makeVehicleBusinessLogic({ store, entity, helper });
  return businessLogic;
};

module.exports = { makeVehicleController };
