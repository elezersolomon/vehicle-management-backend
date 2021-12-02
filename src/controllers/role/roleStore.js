const makeRoleStore = ({ db, helper }) => {
  const { customFunctions } = helper;
  const { filterJsonObject, checkFilterValue } = customFunctions;

  const storeRole = async ({ role }) => { 
    var data = await db.save(role);
    var newRole = { id: data.id, ...role };
    return newRole;
  };

  const getRolesFromStore = async ({ query }) => {
    var data = await db.find({ type: "role", ...query });
    var roleList = [];
    data.map((role) => {
      role.id = role._id;
      delete role._rev;
      delete role.type;
      delete role._id;
      var newRole = {
        id: role.id,
        ...role,
      };
      roleList.push(newRole);
    });
    return roleList;
  };

  const storeRoleHierarchy = async ({ data, id }) => {
    var { parentRoleIds, childRoleIds } = data;
    var roles = await db.find({ type: "role" });

    //check if  child role ids exist in the db
    for (var i = 0; i < childRoleIds.length; i++) {
      var roleId = childRoleIds[i];
      var result = await checkFilterValue(roles, { _id: roleId });
      if (!result) {
        throw new Error("Invalid child role");
      }
    }

    await updateParentRoles(childRoleIds, id);
    var result = await db.update(data);
    var newRole = { id: result.id, ...data };
    delete newRole._id;
    delete newRole._rev;
    return newRole;
  };

  const updateParentRoles = async (childs, id) => {
    //find parent roles of this role (since we are storing the roles id as a child role, the current rle must not be called)
    var roles = await db.find({
      type: "role",
      _id: { $ne: id },
      allChildRoles: { $in: [id] },
    });

    if (roles.length > 0) {
      for (var i = 0; i < roles.length; i++) {
        for (var j = 0; j < childs.length; j++) {
          var childRole = childs[j];
          if (roles[i].allChildRoles.indexOf(childRole) == -1) {
            roles[i].allChildRoles.push(childRole);
          }
        }
      }
      var result = await db.bulkUpdate(roles);
      console.log(result);
    }
  };
  const getRoleByIdFromStore = async ({ id }) => {
    var role = await findItemById({ id, type: "role" });
    var newRole = {
      id: role._id,
      ...role,
    };
    delete newRole._id;
    delete newRole._rev;
    return newRole;
  };

  const findItemById = async ({ id, type }) => {
    var data = await db.find({ type, _id: id });
    if (data.length == 0) {
      throw new Error("Invalid id");
    }

    return data[0];
  };

  const updateRoleStore = () => {};

  return {
    storeRole,
    getRolesFromStore,
    updateRoleStore,
    findItemById,
    getRoleByIdFromStore,
    storeRoleHierarchy,
  };
};

module.exports = { makeRoleStore };
