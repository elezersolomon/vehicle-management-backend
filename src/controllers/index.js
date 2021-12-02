const { makeUserController } = require("./user");
const { makeRoleController } = require("./role");
const { makeTeamController } = require("./team");
const { makeVehicleController } = require("./vehicle");

const makeController = ({ db, helper }) => {
  const userController = makeUserController({ db, helper });
  const roleController = makeRoleController({ db, helper });
  const teamController = makeTeamController({ db, helper });
  const vehicleController = makeVehicleController({ db, helper });

  return {
    ...userController,
    ...roleController,
    ...teamController,
    ...vehicleController,
   
  };
};

module.exports = { makeController };
