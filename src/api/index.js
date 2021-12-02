const makeHttpRequest = (controller, helper) => {
  const { customFunctions } = helper;
  const { checkAuthorization } = customFunctions;

  return async (req, res, next) => {
    try {
      var http = {
        data: req.body,
        query: req.query,
        parameter: req.params,
        token: req.headers["authorization"],
        isAuthorized: await checkAuthorization(req.headers["authorization"]),
      };

      var result = await controller(http);
      res.status(200).send({ status: true, result: result });
    } catch (error) {
      //console.log(`ERROR: ${error.message}`);
      console.log(error);
      res.status(400).send({ status: false, error: error.message });
    }
  };
};

const makeApi = ({ router, controller, helper }) => {
  router.get("/test", (req, res) => res.send("working.."));
  router.post(
    "/user/system/adminuser",
    makeHttpRequest(controller.createInitialAdminUser, helper)
  );

  //ROLE APIs
  router.post("/role", makeHttpRequest(controller.createRole, helper));
  router.get("/role", makeHttpRequest(controller.findRoles, helper));
  router.get("/role/:id", makeHttpRequest(controller.findRoleById, helper));

  //TEAM APIs
  router.post("/team", makeHttpRequest(controller.createTeam, helper));
  router.get("/team", makeHttpRequest(controller.findTeams, helper));
  router.get("/team/:id", makeHttpRequest(controller.findTeamById, helper));

  //USER APIs
  router.post("/user", makeHttpRequest(controller.createUser, helper));
  router.get("/user", makeHttpRequest(controller.findUsers, helper));
  router.post("/user/signIn", makeHttpRequest(controller.signIn, helper));
  router.post("/user/:id/reset", makeHttpRequest(controller.resetUser, helper));
  router.post(
    "/user/:id/deactivate",
    makeHttpRequest(controller.deactivateUser, helper)
  );
  router.post("/user/:id/edit", makeHttpRequest(controller.editUser, helper));

  //VEHICLE APIs
  router.post("/vehicle", makeHttpRequest(controller.createVehicle, helper));
  router.post(
    "/vehicle/owner",
    makeHttpRequest(controller.createBatchVehicleOwners, helper)
  );
  router.get(
    "/vehicle/owner",
    makeHttpRequest(controller.findVehicleOwners, helper)
  );
  router.put(
    "/vehicle/owner/:id",
    makeHttpRequest(controller.editVehicleOwner, helper)
  );
  router.put(
    "/vehicle/owner/:id/batch",
    makeHttpRequest(controller.editBatchVehicleOwners, helper)
  );

  //DEVICE APIs
  router.post("/device", makeHttpRequest(controller.createDevice, helper));
  router.get("/device", makeHttpRequest(controller.findDevices, helper));
  router.post("/simcard", makeHttpRequest(controller.createSimcard, helper));
  router.get("/simcard", makeHttpRequest(controller.findSimcards, helper));
  router.post("/accessory", makeHttpRequest(controller.createAccessory, helper));
  router.get("/accessory", makeHttpRequest(controller.findAccessories, helper));
  router.post(
    "/device/:id/pair",
    makeHttpRequest(controller.pairDeviceAndSimcard, helper)
  );
  router.post(
    "/device/:id/detach",
    makeHttpRequest(controller.pairDeviceAndSimcard, helper)
  );
};

module.exports = { makeApi };
