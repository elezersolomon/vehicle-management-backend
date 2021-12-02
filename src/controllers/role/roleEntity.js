const makeRoleEntity = ({ helper }) => {
  const { error, customFunctions, validators } = helper;
  const { currentDate } = customFunctions;
  const { InvalidPropertyError } = error;

  const { isArray } = validators;

  const validateRoleCreation = ({ data, creator }) => {
    var { roleName, accessLevel } = data;

    if (roleName == undefined) {
      throw new Error(`Role name is required`);
    }

    if (accessLevel == undefined) {
      throw new Error(`Access level is required`);
    }

    if (accessLevel == "") {
      throw new Error("Access level can't be empty");
    }

    if (roleName == "") {
      throw new Error(`Role name can't be empty`);
    }

    if (roleName.length > 100) {
      throw new InvalidPropertyError(
        `Role name length can't be greater than 100 characters`
      );
    }

    return {
      type: "role",
      roleName: roleName.toString().trim(),
      accessLevel: accessLevel.toString().trim(),

      createdBy: {
        id: creator.id,
        fullName: creator.fullName,
      },
      createdDate: {
        timeStamp: currentDate().timestamp,
        isoStringDate: currentDate().isoStringDate,
        stringDate: currentDate().stringDate,
      },
    };
  };

  const validateRoleUpdate = () => {};

  const validateRoleHierarchy = ({ data, role }) => {
    var { childRoleIds } = data;

    if (!isArray(childRoleIds) || childRoleIds.length == 0) {
      throw new Error("Invalid child roles");
    }

    childRoleIds.map((childRole) => {
      if (role.childRoleIds.indexOf(childRole) == -1) {
        role.childRoleIds.push(childRole);
        role.allChildRoles.push(childRole);
      }
    });

    return role;
  };

  return { validateRoleCreation, validateRoleUpdate, validateRoleHierarchy };
};

module.exports = { makeRoleEntity };
