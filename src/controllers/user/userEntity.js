const makeUserEntity = ({ helper }) => {
  const { error, customFunctions, validators } = helper;
  const { InvalidPropertyError } = error;
  const { hashPassword, currentDate } = customFunctions;
  const { checkEmptyAndUndefined } = validators;

  const validateUserCreation = async ({ user, creator }) => {
    if (checkEmptyAndUndefined(user.fullName)) {
      throw new Error("Full name is required");
    } else if (checkEmptyAndUndefined(user.userName)) {
      throw new Error("User name is required");
    } else if (checkEmptyAndUndefined(user.password)) {
      throw new Error("Password is required");
    } else if (user.password.length < 8) {
      throw new Error("Password length has to be greater than 8 characters");
    }
    var newUser = {
      type: "user",
      fullName: user.fullName.toString().trim(),
      userName: user.userName.toString().trim(),
      password: await hashPassword(user.password.toString().trim()),
      isActive: true,
      role: {
        id: user.role,
        roleName: "",
        accessLevel: "",
      },
      team: {
        id: user.team,
        name: "",
      },
      createdBy: {
        id: creator.id,
        fullName: creator.fullName,
        userName: creator.userName,
      },
      createdDate: {
        timeStamp: currentDate().timestamp,
        isoStringDate: currentDate().isoStringDate,
        stringDate: currentDate().stringDate,
      },
    };
    return newUser;
  };

  const validateSignIn = ({ data }) => {
    if (checkEmptyAndUndefined(data.userName)) {
      throw new InvalidPropertyError(`User name can't be empty`);
    } else if (checkEmptyAndUndefined(data.password)) {
      throw new InvalidPropertyError(`Password can't be empty`);
    }

    var user = {
      userName: data.userName.toString().trim(),
      password: data.password.toString().trim(),
    };

    return user;
  };

  const validateUserEdition = ({ user, id }) => {
    if (checkEmptyAndUndefined(user.fullName)) {
      throw new InvalidPropertyError(`Full name is required`);
    } else if (checkEmptyAndUndefined(user.role)) {
      throw new InvalidPropertyError(`Role is required`);
    } else if (user.team == undefined) {
      throw new InvalidPropertyError(`Team is required`);
    } else if (checkEmptyAndUndefined(id)) {
      throw new InvalidPropertyError(`Invalid ID`);
    }

    var user = { 
      id,
      fullName: user.fullName,
      role: user.role,
      team: user.team,
    };
    return user;
  };

  const validateUserReset = async ({ user, id }) => {
    if (checkEmptyAndUndefined(id)) {
      throw new InvalidPropertyError(`Id can't be empty`);
    } else if (checkEmptyAndUndefined(user.password)) {
      throw new InvalidPropertyError(`Password can't be empty`);
    } else if (user.password.length < 8) {
      throw new Error("Password length has to be greater than 8 characters");
    }

    var userEntity = {
      id: id.toString().trim(),
      password: await hashPassword(user.password.toString().trim()),
    };

    return userEntity;
  };

  const validateUserDeactivation = ({ id }) => {
    if (checkEmptyAndUndefined(id)) {
      throw new InvalidPropertyError(`Id can't be empty`);
    }
    var userEntity = {
      id: id.toString().trim(),
    };

    return userEntity;
  };

  return {
    validateUserCreation,
    validateSignIn,
    validateUserDeactivation,
    validateUserEdition,
    validateUserReset,
  };
};

module.exports = { makeUserEntity };
