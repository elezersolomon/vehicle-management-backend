const makeRoleBusinessLogic = ({ store, entity, helper }) => {
  const { validateRoleCreation, validateRoleHierarchy } = entity;
  const {
    storeRole,
    getRolesFromStore,
    findItemById,
    storeRoleHierarchy,
    getRoleByIdFromStore,
  } = store;
  //const { customFunctions } = helper;

  const createRole = ({ data, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }
    var userData = isAuthorized.user;
   
    var role = validateRoleCreation({ data, creator: userData });
    var newRole = storeRole({ role });
    return newRole;
  };

  const findRoles = ({ data, query, parameter, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }
    var roles = getRolesFromStore({ query });
    return roles;
  };

  const findRoleById = ({ data, query, parameter, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }

    var role = getRoleByIdFromStore({ id: parameter.id });
    return role;
  };

  const defineHierarchy = async ({ data, parameter, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }
    var role = await findItemById({ type: "role", id: parameter.id });
    var roleEntity = validateRoleHierarchy({ data, role });
    var newRole = storeRoleHierarchy({ data: roleEntity, id: parameter.id });
    return newRole;
  };

  return { createRole, findRoles, findRoleById, defineHierarchy };
};

module.exports = { makeRoleBusinessLogic };
