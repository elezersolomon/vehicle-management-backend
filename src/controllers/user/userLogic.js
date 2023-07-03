const makeUserBusinessLogic = ({ store, entity, helper }) => {
  const { customFunctions, initialData } = helper;
  const { generateToken } = customFunctions;
  const {
    validateUserCreation,
    validateSignIn,
    validateUserReset,
    validateUserDeactivation,
    validateUserEdition,
  } = entity;
  const {
    storeUser,
    checkUserInfoInStore,
    editUserInStore,
    findUsersFromStore,
    resetUserInStore,
    deactivateUserInStore,
    storeSystemAdmin,
  } = store;

  const createUser = async ({ data, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }

    var userEntity = await validateUserCreation({
      user: data,
      creator: isAuthorized.user,
    });

    var userData = storeUser({ data: userEntity });
    return userData;
  };

  const findUsers = async ({ query, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }

    var userData = findUsersFromStore({ query });
    return userData;
  };
  const signIn = async ({ data, query, parameter }) => {
    console.log("datasignin :  ", data);

    var validatedUser = validateSignIn({ data });
    var userData = await checkUserInfoInStore({ user: validatedUser });
    var token = generateToken(userData, "12H");
    return token;
  };

  const editUser = async ({ data, parameter, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }

    var userEntity = await validateUserEdition({
      user: data,
      id: parameter.id,
    });
    var userData = editUserInStore({ data: userEntity });
    return userData;
  };

  const createInitialAdminUser = async () => {
    var user = initialData.initialAdminUser;
    var role = initialData.initialAdminRole;
    var userData = storeSystemAdmin({ data: { user, role } });
    return userData;
  };

  const deactivateUser = async ({ parameter, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }

    var userEntity = await validateUserDeactivation({ id: parameter.id });
    var userData = deactivateUserInStore({ data: userEntity });
    return userData;
  };

  const resetUser = async ({ data, parameter, isAuthorized }) => {
    if (!isAuthorized.status) {
      throw new Error("Not Authorized");
    }

    var userEntity = await validateUserReset({ user: data, id: parameter.id });
    var userData = resetUserInStore({ data: userEntity });
    return userData;
  };

  return {
    createUser,
    findUsers,
    signIn,
    editUser,
    createInitialAdminUser,
    deactivateUser,
    resetUser,
  };
};

module.exports = { makeUserBusinessLogic };
