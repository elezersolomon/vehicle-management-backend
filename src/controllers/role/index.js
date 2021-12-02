const { makeRoleEntity } = require("./roleEntity");
const { makeRoleBusinessLogic } = require("./roleLogic");
const { makeRoleStore } = require("./roleStore");

const makeRoleController = ({ db, helper }) => {
  const store = makeRoleStore({db, helper}); 
  const entity = makeRoleEntity({helper})
  const businessLogic = makeRoleBusinessLogic({store, entity, helper})
  return businessLogic
};

module.exports = { makeRoleController };
