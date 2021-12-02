const makeVehicleStore = ({ db }) => {
  const storeBatchVehicles = async ({ data }) => {
    //TODO: Refactor the logic below, the loop below creates to many DB calls.
    //use pouchdb Buil methods to save the document
    //TODO: validate duplicate values for vin number plate number and other fields
    var vehicleOwnerList = [];
    for (var i = 0; i < data.length; i++) {
      var vehicleOwner = data[i];
      var { id, rev } = await db.save(vehicleOwner);
      vehicleOwnerList.push({ id, ...vehicleOwner });
    }

    return vehicleOwnerList;
  };

  const findVehicleOwnersFromStore = async ({ query }) => {
    var vehicleOwners = await db.find({ type: "vehicle", ...query });
    var vehicleOwnerList = [];
    //TODO: Since _id and _rev are pouchdb logics they should be handled in the db query.js functions
    // move the loop to ./db/query.js method
    for (var j = 0; j < vehicleOwners.length; j++) {
      var vehicleOwner = vehicleOwners[j];
      var newVehicleOwner = { id: vehicleOwner._id, ...vehicleOwner };
      delete newVehicleOwner._id;
      delete newVehicleOwner._rev;
      vehicleOwnerList.push(newVehicleOwner);
    }
    return vehicleOwnerList;
  };

  const editVehicleOwnerInStore = async ({ data }) => {
    //TODO: validate duplicate values for vin number plate number and other fields
    var { id } = await db.update(data);
    delete data._id;
    delete data._rev;
    var vehicleOwnerData = { id, ...data };
    return vehicleOwnerData;
  };

  const editBatchVehicleOwnerInStore = async ({ data }) => {
    //TODO: validate duplicate values for vin number plate number and other fields
    var result = await db.bulkUpdate(data);
    console.log(result)
    return "Vehicles updated successfully";
  };

  const findItemById = async ({ id, type }) => {
    var data = await db.find({ type, _id: id });
    if (data.length == 0) {
      throw new Error("Invalid id");
    }
    return data[0];
  };

  const findItemByOrderId = async ({ id, type }) => {
    var vehicleOwnerData = await findItemById({ id, type });
    var { orderId } = vehicleOwnerData;
    var vehicles = await db.find({ type: "vehicle", orderId });
    return vehicles;
  };
  return {
    storeBatchVehicles,
    findVehicleOwnersFromStore,
    editVehicleOwnerInStore,
    editBatchVehicleOwnerInStore,
    findItemById,
    findItemByOrderId,
  };
};

module.exports = { makeVehicleStore };
