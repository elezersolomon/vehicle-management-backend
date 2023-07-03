const makeUserStore = ({ db, helper }) => {
  const { customFunctions } = helper;
  const { comparePassword, hashPassword } = customFunctions;

  const storeUser = async ({ data }) => {
    var user = data;
    var userName = await db.find({ type: "user", userName: user.userName });

    if (userName.length > 0) {
      throw new Error("This user name is already taken");
    }

    //update users role
    var role = await findItemById({ type: "role", id: user.role.id });
    user.role.roleName = role.roleName;
    user.role.accessLevel = role.accessLevel;

    //update users team
    var usersTeam = user.team.id;
    if (usersTeam !== "") {
      var team = await findItemById({ type: "team", id: user.team.id });
      user.team.name = team.name;
    }

    var result = await db.save(user);
    delete user.password;
    user = { id: user.id, ...data };
    return data;
  };

  const findUsersFromStore = async ({ query }) => {
    var users = await db.find({ type: "user", ...query });
    var usersList = [];
    for (var i = 0; i < users.length; i++) {
      var user = { id: users[i]._id, ...users[i] };
      delete user._id;
      delete user._rev;
      delete user.password;
      usersList.push(user);
    }
    return usersList;
  };

  const checkUserInfoInStore = async ({ user }) => {
    var { userName, password } = user;
    var userData = await db.find({ type: "user", userName });
    console.log("userdatalength : ", userData, userName, password);

    if (userData.length == 0) {
      throw new Error("Invalid user name or password");
    }

    if (!userData[0].isActive) {
      throw new Error("This user is deactivated");
    }

    var isPasswordVaid = await comparePassword(password, userData[0].password);
    if (!isPasswordVaid) {
      throw new Error("Invalid user name or password");
    }

    userData = userData[0];
    var userInformation = {
      id: userData._id,
      fullName: userData.fullName,
      userName: userData.userName,
      role: userData.role,
    };
    return userInformation;
  };

  const editUserInStore = async ({ data }) => {
    var userRole = await db.find({ type: "role", _id: data.role });
    if (userRole.length == 0) {
      throw new Error("Invalid role");
    }

    var usersTeam = await db.find({ type: "team", _id: data.team });
    if (data.team !== "" && usersTeam.length == 0) {
      throw new Error("Invalid team");
    }

    var userData = await db.find({ type: "user", _id: data.id });

    if (userData.length == 0) {
      throw new Error("Invalid user ID");
    }

    var user = userData[0];
    user.fullName = data.fullName;
    user.role.id = data.role;
    user.team.id = data.team;

    var result = await db.update(user);

    var newUser = { id: user._id, ...user };
    delete newUser._id;
    delete newUser._rev;
    delete newUser.password;

    return newUser;
  };

  const resetUserInStore = async ({ data }) => {
    var { password, id } = data;
    var userData = await db.find({ type: "user", _id: id });
    if (userData.length == 0) {
      throw new Error("Invalid user ID");
    }

    userData = userData[0];
    userData.password = password;
    await db.update(userData);

    var newUser = {
      id: id,
      ...userData,
    };

    delete newUser.password;
    delete newUser._id;
    delete newUser._rev;

    return newUser;
  };
  const deactivateUserInStore = async ({ data }) => {
    var { id } = data;
    var userData = await db.find({ type: "user", _id: id });
    if (userData.length == 0) {
      throw new Error("Invalid user ID");
    }

    userData = userData[0];
    userData.isActive = !userData.isActive;

    await db.update(userData);

    var newUser = {
      id: id,
      ...userData,
    };

    delete newUser.password;
    delete newUser._id;
    delete newUser._rev;

    return newUser;
  };

  const storeSystemAdmin = async ({ data }) => {
    var { user, role } = data;
    var systemAdmin = await db.find({ type: "user", systemTag: "adminUser" });

    if (systemAdmin.length == 0) {
      var roleData = await db.save(role);
      user.password = await hashPassword(user.password);
      user.role.id = roleData.id;
      user.role.roleName = role.roleName;
      user.role.accessLevel = role.accessLevel;
      var userData = await db.save(user);
      return "System admin created successfully";
    } else {
      throw new Error("System admin is already created");
    }
  };

  const findItemById = async ({ id, type }) => {
    var data = await db.find({ type, _id: id });
    if (data.length == 0) {
      throw new Error("Invalid id");
    }
    return data[0];
  };

  return {
    storeUser,
    findUsersFromStore,
    checkUserInfoInStore,
    editUserInStore,
    resetUserInStore,
    deactivateUserInStore,
    storeSystemAdmin,
  };
};

module.exports = { makeUserStore };
