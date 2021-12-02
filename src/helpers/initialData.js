const env = require("./environment");
const { makeCustomFunctions } = require("./customMethods");

const customFunctions = makeCustomFunctions({ env });
const { currentDate } = customFunctions;

module.exports = {
  initialAdminUser: {
    type: "user",
    systemTag: "adminUser",
    fullName: "Manager",
    userName: "manager",
    password: env.api.initialAdminPassword.toString().trim(),
    isActive: true,
    role: {
      id: "",
      roleName: "",
      accessLevel:"",
    },
    team: {
      id: "", 
      name: "", 
    },
    createdBy: {
      id: "system",
      fullName: "system",
      userName: "system",
    },
    createdDate: {
      timeStamp: currentDate().timestamp,
      isoStringDate: currentDate().isoStringDate,
      stringDate: currentDate().stringDate,
    },
  },

  initialAdminRole: {
    type: "role",
    systemTag: "adminRole",
    roleName: "Manager",
    accessLevel:"manager",
    createdBy: {
      id: "system",
      fullName: "system",
      userName: "system",
    },
    createdDate: {
      timeStamp: currentDate().timestamp,
      isoStringDate: currentDate().isoStringDate,
      stringDate: currentDate().stringDate,
    },
  },
};
