const makeVehicleBusinessLogic = ({ store, helper, entity }) => {
  const {
    validateBatchVehicleOwnerCreation,
    validateVehicleOwnerEdition,
    validateBatchVehicleOwnerEdition,
  } = entity;
  const {
    storeBatchVehicles,
    findVehicleOwnersFromStore,
    editVehicleOwnerInStore,
    findItemById,
    findItemByOrderId,
    editBatchVehicleOwnerInStore
  } = store;

  const createVehicle = ({ data, isAuthorized }) => {
    var { status, user } = isAuthorized;
  };

  const createBatchVehicleOwners = async ({ data, isAuthorized }) => {
    var { status, user } = isAuthorized;
    if (!status) {
      throw new Error("Not Authorized");
    }

    var vehicleOwnerEntity = await validateBatchVehicleOwnerCreation({
      data,
      creator: user,
    });
    var vehicleOwnerData = await storeBatchVehicles({
      data: vehicleOwnerEntity,
    });
    return vehicleOwnerData;
  };

  const createBatchVehicles = () => {};

  const findVehicles = async ({ query, isAuthorized }) => {
    // var vehicleOwner = await
  };

  const findVehicleOwners = async ({ query, isAuthorized }) => {
    var { status, user } = isAuthorized;
    if (!status) {
      throw new Error("Not Authorized");
    }

    var vehicleOwners = await findVehicleOwnersFromStore({ query });
    return vehicleOwners;
  };

  const editVehicleOwner = async ({ data, parameter, isAuthorized }) => {
    var { status, user } = isAuthorized;
    if (!status) {
      throw new Error("Not Authorized");
    }

    var vehicleOwnerData = await findItemById({
      id: parameter.id,
      type: "vehicle",
    });
    var vehicleOwnerEntity = await validateVehicleOwnerEdition({
      data,
      vehicleOwnerData,
    });
    var newVehicleOwenrData = await editVehicleOwnerInStore({
      data: vehicleOwnerEntity,
    });
    return newVehicleOwenrData;
  };

  const editBatchVehicleOwners = async ({ data, parameter, isAuthorized }) => {
    var { status, user } = isAuthorized;
    if (!status) {
      throw new Error("Not Authorized");
    }

    var vehicleOwnerData = await findItemByOrderId({
      id: parameter.id,
      type: "vehicle",
    });
    var vehicleOwnerEntity = await validateBatchVehicleOwnerEdition({
      data,
      vehicleOwnerData,
    });

     var newVehicleOwenrData = await editBatchVehicleOwnerInStore({data: vehicleOwnerEntity})
     return newVehicleOwenrData
  };

  const findVehicleById = () => {};

  const sendEditRequestForVehicle = () => {};

  const sendEditRequestForBatchVehicles = () => {};

  return {
    createBatchVehicles,
    createVehicle,
    findVehicles,
    findVehicleOwners,
    findVehicleById,
    editVehicleOwner,
    editBatchVehicleOwners,
    sendEditRequestForBatchVehicles,
    sendEditRequestForVehicle,
    createBatchVehicleOwners,
  };
};

module.exports = { makeVehicleBusinessLogic };
