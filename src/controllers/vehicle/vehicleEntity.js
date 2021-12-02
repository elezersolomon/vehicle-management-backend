const { custom } = require("@hapi/joi");
const { VehicleOwner } = require("../../../JoySchema/Vehicle_Schema");

const makeVehicleEntity = ({ helper }) => {
  const { customFunctions } = helper;
  const { makeId, currentDate } = customFunctions;

  const validateVehicleCreation = () => {};

  const validateBatchVehicleCreation = () => {};

  const validateBatchVehicleOwnerCreation = ({ data, creator }) => {
    //TODO: create a batch item validator and a vehicle schema
    //TODO: Allow users to update their remark, autogenerate expiry date, store users data value both in string and iso format

    var vehicleOwnersList = [];
    var orderId = makeId();
    data.map((vehicle) => {
      vehicleOwnersList.push({
        type: "vehicle",
        orderId,
        ownerInformation: {
          ownerName: vehicle.ownerName,
          ownerContactNumber: vehicle.ownerContactNumber,
          importerName: vehicle.importerName,
          importerContactNumber: vehicle.importerContactNumber,
          remark: [{ remark: vehicle.remark, createdBy: "" }],
          creator: {
            id: creator.id,
            fullName: creator.fullName,
          },
          createdAt: currentDate(),
        },
        paymentInformation: {
          amountPaid: vehicle.amountPaid,
          paymentDate: vehicle.paymentDate,
          paymentStatus: "",
          receiptNumber: vehicle.receiptNumber,
          certificateNumber: vehicle.certificateNumber,
        },
        vehicleInformation: {
          vin: vehicle.vin,
          plateNumber: vehicle.plateNumber,
          installationInformation: {
            placeOfInstallation: vehicle.placeOfInstallation,
          },
        },
      });
    });

    return vehicleOwnersList;
  };

  const validateVehicleOwnerEdition = ({ data, vehicleOwnerData }) => {
    //TODO: validate all data which comes from the user

    vehicleOwnerData.ownerInformation.ownerName = data.ownerName;
    vehicleOwnerData.ownerInformation.importerName = data.importerName;
    vehicleOwnerData.ownerInformation.ownerContactNumber =
      data.ownerContactNumber;
    vehicleOwnerData.ownerInformation.importerContactNumber =
      data.importerContactNumber;
    vehicleOwnerData.ownerInformation.remark = data.remark;

    vehicleOwnerData.paymentInformation.amountPaid = data.amountPaid;
    vehicleOwnerData.paymentInformation.paymentDate = data.paymentDate;
    vehicleOwnerData.paymentInformation.receiptNumber = data.receiptNumber;
    vehicleOwnerData.paymentInformation.certificateNumber =
      data.certificateNumber;

    vehicleOwnerData.vehicleInformation.vin = data.vin;
    vehicleOwnerData.vehicleInformation.plateNumber = data.plateNumber;
    vehicleOwnerData.vehicleInformation.installationInformation.placeOfInstallation =
      data.placeOfInstallation;

    return vehicleOwnerData;
  };

  const validateBatchVehicleOwnerEdition = ({ data, vehicleOwnerData }) => { 
    var vehicleList = []
    for(var j=0; j<vehicleOwnerData.length; j++){
      var vehicle = vehicleOwnerData[j] 
      vehicle.ownerInformation.ownerName = data.ownerName;
      vehicle.ownerInformation.importerName = data.importerName;
      vehicle.ownerInformation.ownerContactNumber =
        data.ownerContactNumber;
      vehicle.ownerInformation.importerContactNumber =
        data.importerContactNumber;
  
      vehicle.paymentInformation.amountPaid = data.amountPaid;
      vehicle.paymentInformation.paymentDate = data.paymentDate;
      vehicle.paymentInformation.receiptNumber = data.receiptNumber;
      vehicle.paymentInformation.certificateNumber =
        data.certificateNumber;
  
      // vehicle.vehicleInformation.vin = data.vin;
      // vehicle.vehicleInformation.plateNumber = data.plateNumber;
      vehicle.vehicleInformation.installationInformation.placeOfInstallation =
        data.placeOfInstallation;
  
      vehicleList.push(vehicle);
    }

    return vehicleList
  };
  return {
    validateBatchVehicleCreation,
    validateBatchVehicleOwnerCreation,
    validateVehicleCreation,
    validateVehicleOwnerEdition,
    validateBatchVehicleOwnerEdition,
  };
};

module.exports = { makeVehicleEntity };
